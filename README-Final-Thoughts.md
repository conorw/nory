# Summary
This document contains my final thoughts on the challenge.

## Time Spent
In total I spent around 9 hours on this challenge.
The main reason for the extra time was due to deployment issues, docker and the excentricities of running on Windows.
Demonstrating the deployment was a key part of the challenge and I wanted to make sure I had a solution for the good folks at WeirdSalads.
Without these issues, I would have spent around 6 hours on the challenge.

## What I learned
Usually I would deploy straight to a cloud provider like Vercel, but the challenge specifically needed a local deployment. This was a good learning experience for me as I had to learn how to deploy a SvelteKit/Node app on a local network.
I also learned how to use Docker to deploy the app. This was a good learning experience as I had not used Docker for a while and it was good to refresh my memory.
I also got to use sqlite for the first time and enjoyed it.
I also learned how to use typeorm to act as an abstraction for the database choice. Have the types being used for the frontend, backend and to generate the database schema was hugely productive.
Most of the other technologies I had used before, so it was good to get some more practice with them.
I had wanted to try out other technologies like TailwindCSS, but I decided to stick with what I knew to get the challenge done in time.

## Improvements
If I had more time, I would have liked to have added more features to the app.
Here are some features I would have liked to have added:

- Taking stock feature. I ran out of time to implement this feature. It was the next item on the priority list. In the meantime staff can keep track of stock levels by keeping a paper log or through excel.
- Reporting. I would have liked to have added a reporting feature to the app. This would have allowed managers to see an overview of the inventory and sales. However, they can still get this information by looking by downloading the spreadsheet and using the excel features.
- Export to spreadsheet. This would have been a nice feature to have. It would have allowed managers to export the data to a spreadsheet for further analysis.
- User authentication
- User roles
- Logging of who did what
- 1 click install
- Easy to maintain. I would have liked to have added some monitoring features to the app. This would have allowed managers to see if the app was running and to restart it if it was not.
- Easy to start. I would have liked to have added a feature to the app that would have allowed it to start automatically when the server was turned on. This would have made it easier for staff to start the app.
- Alerts for shortages. I would have liked to have added a feature that would have alerted staff when stock levels were low. This would have allowed them to order more stock before they ran out.
- Admin UI for managing recipes and ingredients. This would have allowed managers to add, update and delete recipes and ingredients.
- More tests.

