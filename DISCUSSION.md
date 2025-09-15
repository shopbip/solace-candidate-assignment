## Further changes given more time

## API Route enhancements
The API route for fetching advocates is bare bones. I would add data validation, caching, rate limiting and improve upon the error handling to ensure safety and reliability for this interaction. 

I would like to implement a wrapper for the api calls to ensure authorization, headers, and configurations are consistent across the API.

## Fetch Query parameters
I would consider modifying the advocate fetch route to accept query parameters. This could reduce the complexity on the front end and allow for more robust searches.

## Components
I would add a components folder and begin breaking down the search page into a search page components as well as sub components for the search bar and the search results.

## Search enhancement
The search feature can be made more powerul. Since this seems like an administrative tool, I would suggest adding multi field search capability as well as an exclude fields option. I would also add a sort by option to sort results by a specific field in ascending/descending order.

I would also modify the search so that if just a number is entered it will filter by years of experience greater than that number.

## Layout
The base layout is basic. It would be nice to have styling standards implemented in the layout in order to minimize redundant implementations in sub pages.