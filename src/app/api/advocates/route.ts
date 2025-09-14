import db from "../../../db";
import { advocates } from "../../../db/schema";
import { count, desc, asc, eq, ilike, or, SQL } from "drizzle-orm";

// Validation schemas
const validatePagination = (page: string | null, limit: string | null) => {
  const pageNum = page ? parseInt(page, 10) : 1;
  const limitNum = limit ? parseInt(limit, 10) : 10;
  
  if (isNaN(pageNum) || pageNum < 1) {
    throw new Error("Page must be a positive integer");
  }
  
  if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
    throw new Error("Limit must be between 1 and 100");
  }
  
  return { page: pageNum, limit: limitNum };
};

const validateSort = (sort: string | null) => {
  const allowedSorts = ['firstName', 'lastName', 'city', 'yearsOfExperience', 'createdAt'];
  if (sort && !allowedSorts.includes(sort)) {
    throw new Error(`Invalid sort field. Allowed: ${allowedSorts.join(', ')}`);
  }
  return sort || 'createdAt';
};

const validateOrder = (order: string | null) => {
  if (order && !['asc', 'desc'].includes(order.toLowerCase())) {
    throw new Error("Order must be 'asc' or 'desc'");
  }
  return order?.toLowerCase() || 'desc';
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract and validate query parameters
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');
    const search = searchParams.get('search');
    
    // Validate parameters
    const { page: pageNum, limit: limitNum } = validatePagination(page, limit);
    const sortField = validateSort(sort);
    const orderDirection = validateOrder(order);
    
    // Calculate offset
    const offset = (pageNum - 1) * limitNum;
    
    // Build search conditions
    let whereConditions: SQL[] = [];
    if (search) {
      const searchTerm = `%${search}%`;
      whereConditions = [
        ilike(advocates.firstName, searchTerm),
        ilike(advocates.lastName, searchTerm),
        ilike(advocates.city, searchTerm),
        ilike(advocates.degree, searchTerm),
      ];
    }
    
    // Build sort conditions
    let sortOrder;
    switch (sortField) {
      case 'firstName':
        sortOrder = orderDirection === 'asc' ? asc(advocates.firstName) : desc(advocates.firstName);
        break;
      case 'lastName':
        sortOrder = orderDirection === 'asc' ? asc(advocates.lastName) : desc(advocates.lastName);
        break;
      case 'city':
        sortOrder = orderDirection === 'asc' ? asc(advocates.city) : desc(advocates.city);
        break;
      case 'yearsOfExperience':
        sortOrder = orderDirection === 'asc' ? asc(advocates.yearsOfExperience) : desc(advocates.yearsOfExperience);
        break;
      case 'createdAt':
        sortOrder = orderDirection === 'asc' ? asc(advocates.createdAt) : desc(advocates.createdAt);
        break;
      default:
        sortOrder = desc(advocates.createdAt);
    }
    
    // Get total count for pagination
    const totalCountResult = await db
      .select({ count: count() })
      .from(advocates)
      .where(whereConditions.length > 0 ? or(...whereConditions) : undefined);
    
    const totalCount = totalCountResult[0]?.count || 0;
    
    // Get paginated data
    const data = await db
      .select()
      .from(advocates)
      .where(whereConditions.length > 0 ? or(...whereConditions) : undefined)
      .orderBy(sortOrder)
      .limit(limitNum)
      .offset(offset);
    
    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;
    
    // Build response with pagination metadata
    const response = {
      data,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalCount,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
      filters: {
        search: search || null,
        sort: sortField,
        order: orderDirection,
      }
    };
    
    // Add caching headers
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      'X-Total-Count': totalCount.toString(),
      'X-Page': pageNum.toString(),
      'X-Total-Pages': totalPages.toString(),
    });
    
    return new Response(JSON.stringify(response), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error fetching advocates:', error);
    
    // Handle validation errors
    if (error instanceof Error && error.message.includes('must be')) {
      return Response.json({ 
        error: 'Validation Error',
        message: error.message 
      }, { status: 400 });
    }
    
    // Handle database errors
    if (error instanceof Error && error.message.includes('database')) {
      return Response.json({ 
        error: 'Database Error',
        message: 'Unable to fetch advocates at this time' 
      }, { status: 503 });
    }
    
    // Generic error
    return Response.json({ 
      error: 'Internal Server Error',
      message: 'An unexpected error occurred' 
    }, { status: 500 });
  }
}
