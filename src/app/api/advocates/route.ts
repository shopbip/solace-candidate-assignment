import db from "../../../db";
import { advocates } from "../../../db/schema";
import { count, desc, asc, eq, ilike, or, SQL } from "drizzle-orm";

// Helper functions for query parameter validation
function validatePagination(page: string | null, limit: string | null) {
  const pageNum = page ? parseInt(page, 10) : 1;
  const limitNum = limit ? parseInt(limit, 10) : 10;
  
  if (isNaN(pageNum) || pageNum < 1) {
    throw new Error("Invalid page parameter. Must be a positive integer.");
  }
  
  if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
    throw new Error("Invalid limit parameter. Must be between 1 and 100.");
  }
  
  return { page: pageNum, limit: limitNum };
}

function validateSort(sort: string | null) {
  const validSortFields = ['firstName', 'lastName', 'city', 'degree', 'yearsOfExperience'];
  if (sort && !validSortFields.includes(sort)) {
    throw new Error(`Invalid sort field. Must be one of: ${validSortFields.join(', ')}`);
  }
  return sort || 'firstName';
}

function validateOrder(order: string | null) {
  if (order && !['asc', 'desc'].includes(order.toLowerCase())) {
    throw new Error("Invalid order parameter. Must be 'asc' or 'desc'.");
  }
  return order?.toLowerCase() || 'asc';
}

export async function GET(request: Request) {
  // // Basic auth check
  // const authHeader = request.headers.get('authorization');
  // if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
  //   return Response.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  try {
    // Parse URL and extract query parameters
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    // Validate query parameters
    const { page: pageNum, limit: limitNum } = validatePagination(page, limit);
    const sortField = validateSort(sort);
    const sortOrder = validateOrder(order);

    // Calculate offset for pagination
    const offset = (pageNum - 1) * limitNum;

    // Build search conditions
    let whereCondition: SQL | undefined;
    if (search && search.trim()) {
      const searchTerm = `%${search.trim()}%`;
      whereCondition = or(
        ilike(advocates.firstName, searchTerm),
        ilike(advocates.lastName, searchTerm),
        ilike(advocates.city, searchTerm),
        ilike(advocates.degree, searchTerm)
      );
    }

    // Determine sort column and order
    let sortColumn;
    let sortDirection;
    
    switch (sortField) {
      case 'firstName':
        sortColumn = advocates.firstName;
        break;
      case 'lastName':
        sortColumn = advocates.lastName;
        break;
      case 'city':
        sortColumn = advocates.city;
        break;
      case 'degree':
        sortColumn = advocates.degree;
        break;
      case 'yearsOfExperience':
        sortColumn = advocates.yearsOfExperience;
        break;
      default:
        sortColumn = advocates.firstName;
    }
    
    sortDirection = sortOrder === 'desc' ? desc(sortColumn) : asc(sortColumn);

    // Get total count for pagination metadata
    const totalCountResult = await db
      .select({ count: count() })
      .from(advocates)
      .where(whereCondition);
    
    const totalCount = totalCountResult[0]?.count || 0;

    // Fetch paginated data
    const data = await db
      .select()
      .from(advocates)
      .where(whereCondition)
      .orderBy(sortDirection)
      .limit(limitNum)
      .offset(offset);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;

    // Construct response
    const response = {
      data,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalCount,
        totalPages,
        hasNextPage,
        hasPrevPage
      },
      filters: {
        search: search || null,
        sort: sortField,
        order: sortOrder
      }
    };

    // Add cache headers
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      'X-Total-Count': totalCount.toString(),
      'X-Page': pageNum.toString(),
      'X-Total-Pages': totalPages.toString()
    });

    return new Response(JSON.stringify(response), {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('Error in advocates GET route:', error);
    
    // Handle validation errors
    if (error instanceof Error && error.message.includes('Invalid')) {
      return Response.json({ 
        error: error.message 
      }, { status: 400 });
    }
    
    // Handle database errors
    if (error instanceof Error && error.message.includes('database')) {
      return Response.json({ 
        error: "Database error occurred" 
      }, { status: 503 });
    }
    
    // Generic error
    return Response.json({ 
      error: "Failed to fetch advocates" 
    }, { status: 500 });
  }
}
