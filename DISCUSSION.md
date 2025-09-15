## Further changes given more time

## API Route enhancements
The API route for fetching advocates needs better caching. Right now it only has a basic 5 minute cache of the most recent request.

I would like to implement a wrapper for the api calls to ensure authorization, headers, and configurations are consistent across the API.



## Context
The home page is a bit messy, with lots of code present for managing the search. Functions are being passed down to children. This can be cleaned up by adding context or a global state management tool.



## Search enhancement
The search feature can be made more powerul. Right now only one input is given, but there could be an option to perform an advanced search across multiple fields.

I would also modify the search so that if just a number is entered it will filter by years of experience greater than that number.



## Styling
Currently all of the styling is using inline tailwind. There is so much redundancy that I would recommend building custom classes that can be quickly referenced to pull in these frequently used styles.

I wrote my code from a desktop cetnric perspective. While everything works fine in mobile, I would fully rework the mobile experience, possibly ditching the table view for a more custom type of grid of cards view.


## Layout
The layout is bare bones. A header, navigation, and footer could be added in the layout.


