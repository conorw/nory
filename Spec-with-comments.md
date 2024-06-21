# Product Engineer (Inventory Management) - Challenge

We’re going to describe a fictional but realistic situation. It will serve as a taster of the kind of work you’d be doing at Nory - and allow you to show us how you think and to demonstrate your technical skills, craft, opinions. You can solve it in your own time, but it should usually take between **4 and 5 hours**.

The scope is intentionally bigger than you might be able to fit into the span of a few hours - think of it like a real world project with a tight deadline, focus on what you think is **most important** to make the best use of your limited time.
We are excited to see what you cook up! 🧑🏼‍🍳🚀

**NOTES: Important to who? Must haves vs would like to haves?**

## Situation
Weird Salads are a (fictional) fast casual **restaurant chain** with stores at **multiple locations**. Each location currently uses a **spreadsheet** to track their **inventory** (the ingredients used in their salads), which is **manual and cumbersome**. They want to manage their inventory more efficiently - you have been asked to build an application for this purpose.

**NOTES: Success === efficient + not manual + not cumbersome.**

## Requirements
Just like with the spreadsheets before, each **location has its own data**. The application will run on a **computer in-store**, which could be running any of Windows, macOS or Linux. The app will not be public facing, it should not be shared across locations. Each site has secure Wi-Fi and staff will access the store’s system using a mobile web browser via a local IP address.
**NOTES: Cross platform server, local network, secure (customers cant access the same network? does netwrok login identify who the staff user is?), webbrowser, mobile friendly i.e. responsive.**

Staff need to perform the following actions in the app:
•	**Accept deliveries**: When a delivery of fresh ingredients arrives, the chef or another back-of-house employee will add the quantity of the delivered inventory items accordingly.
**NOTES: Imagine a delivery person with a mobile device. Probably in kitchen or outside. Near wifi? Is device charged/available/clean? Are users hands free/clean i.e. need big buttons/inputs. Do we really need to record explicitly which staff is recording?**

•	**Sell items**: When an item on the menu is sold at the front-of-house, the ingredients associated with it are removed accordingly. It must not be possible to sell an item for which not enough ingredients are in stock.
**NOTES: Front of house staff? Different location from chef/delivery. Busy. Need to be quick. Need to be accurate. Need to be able to see what is available. How do staff get alerted if there is a shortage? How does this situation affect front of house and back of house?**

•	**Take stock**: **Periodically**, staff will count all of the inventory in the store and compare with the quantities in the system. Sometimes, the inventory counted does not match the data: ingredients could’ve spoiled or been dropped (waste).
**NOTES: "Periodically" indicates a not as urgent need as the previous requirements? Could be put down priority list?**

•	**Pull reports**: The location manager wants to view a report every month, showing all the inventory movements: **who did what** to change the inventory when and by how much. They also want a summary containing: 
**NOTES: At some point there needs to be a log of who did what**
o	total cost of all deliveries
o	total revenue from all sales
o	total value of current inventory
o	cost of all recorded waste
**NOTES: Definately can be put off as a would like to have. But need to facilitate alternative e.g. export to spreadsheet. Spreadsheet tools usually better than simple app charts. Manager experience with excel. SITUATION: Manager is not in the kitchen. Probably in office (bigger screen). Question over synch with HQ at some point?**

Each location has its **own menu and inventory needs**. The application should restrict all actions to the recipes and ingredients on the location’s menu, and to the staff employed at that specific location.
**NOTES: New requirement here to be able to manage the recipies and ingredients. Do recipies and ingredients change ofen? Is there an alternative to managing this without have a full admin UI?**

Here is a sheet containing the latest data from all locations. 

*** Example data ***
locations: location_id, name, address
**NOTES: Do we even need this info if the app only works at explicit locations?**
staff: staff_id, name, dob, role, iban, bic, location_id
**NOTES: Do we need all this info for our app?**
ingredients: ingredient_id, name, unit, cost
recipes: recipe_id, name, quantity, ingredient_id
modifiers: modifier_id, name, option, price
menus: recipe_id, location_id, price, modifiers
**NOTES: Can an item have multiple modifiers? Lets assume 1. Get head around hierarchy here i.e. Menu>Recipes>Modifiers>Ingredients? Normalized or denormalized data?**

When the stores open for business next time, they will **boot up your app** and see their latest data and be ready to use by the staff.
**NOTES: need some sort of data storage. Local storage? Database?**
Keep in mind that restaurant staff are very busy and typically not very technical - people will be performing any or all of these tasks at the same time and often under pressure.
**NOTES: Boot up. Need to make this process easy to start for non-tech. Easy install process too. Also need to monitor app and reboot automatically. Indicatation and advice if something goes wrong. What can go wrong? wifi? stops working/serving?**


** Identified features and requirements **
Taking the text above into account, we can identify the following features and requirements:

*** Potential Requirements List ***
- [ ] Cross platform server
- [ ] Local network
- [ ] Webbrowser access
- [ ] Mobile friendly/responsive
- [ ] Storage for data
- [ ] Ease of use in busy, dirty, chaotic environments with non-tech staff
- [ ] Reporting overview for management
- [ ] Multi user access
- [ ] Easy to install
- [ ] Easy to start
- [ ] Easy to manintain


*** Potential Features ***
- [ ] 1 click install
- [ ] Auto start on bootup
- [ ] Monitoring and auto rebooting
- [ ] Accept deliveries feature
- [ ] Sell item feature
- [ ] Take stock feature
- [ ] Pull reports
- [ ] Alerts for shortages
- [ ] Log of who did what
- [ ] Export to spreadsheet
- [ ] Admin UI for managing recipies and ingredients
- [ ] Data storage



What we’re looking for
•	A link to a GitHub repository containing 
o	the complete code of your solution
o	clean git history showing iterative progress
o	instructions for building and running the app for any one location, like they would do on the computer in-store (”production”)
**NOTES: As simple as possible e.g. 1 click install. No need for docker or kubernetes? Auto start on each bootup. Is this a would like to have or must have? Essential to uptake and use of system? probably**
o	instructions for verifying that it does the right thing
**NOTES: Need to be able to run the app. Need to be able to test the app. Need to be able to see the app in action.**
o	Markdown commentary on any interesting highlights, challenges, gotchas, decisions made along the way

