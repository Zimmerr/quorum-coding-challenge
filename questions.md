**1. Discuss your strategy and decisions implementing the application. Please, considertime complexity, effort cost, technologies used and any other variable that you understand important on your development process.**

**Answer:** As this was a test meant to be completed quickly, I opted to build a web application using only React and TypeScript. Since we had a low volume of data, it was easy to handle the CSVs using just TypeScript. Being a React app, it was also simple to add Bootstrap to the project and create simple yet elegant tables to present the solution


**2. How would you change your solution to account for future columns that might be requested, such as “Bill Voted On Date” or“Co-Sponsors”?**

**Answer:** Since I built the app using TypeScript, it would be quite easy to add new columns to the tables, as we have interfaces that help control the content of the objects. Only small adjustments would be necessary in the method that loads the data and in the tables themselves


**3. How would you change your solution if instead ofreceiving CSVs of data, you were given a list of legislators or bills that you should generate a CSV for?**

**Answer:** The library I used provides easy support for converting JSON to CSV as well, so it would be trivial to keep the same logic the app has now, but instead return a CSV as a downloadable file, rather than displaying the data in tables


**4. How long did you spend working on the assignment?**

**Answer:** About 2 hours and a half