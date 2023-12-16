/*Project plan*/

Frontend:
 - Viswanath
 - Ajay

Ml model:
 - Dilip
 - Geethika 

Backend:
 - Viswanath
 - Pavan 
 - Ajay

Till now the logins are completed (both f&b).

/*Part - A */
Now step 1: To create a page for employee after a successful login. 
    // A upload data button, if clicked then we ask for 2 options (form & excel) for latitude, image ..etc
    // Task manage option, to see which villages are pending. 
    
Now step 2: To create a page for District director after a successful login. 
    // To verify the details provided by employee and send the data to main backend. 
    // Also create a notification icon to display daily the reminder of the pending villages and after 
       25 times a (means 25th of every month) mail will be sent to dd.

Now step 3: To create a page for joint director after a successful login. 
    // Unknown (need to ask sir again for clarity)
    
Now step 4: To connect the model to the react application and create a component which gets displayed when 
            clicked on search bar in main site 
    //a single row form is provided to select the place, start month&year, end month&year, Download  i.e 
      -- Station/mandal/district/state 
      -- Start month and year 
      -- End month and year 
      -- Download gets enabled when above all are selected and after cliking on search buton the graphs are displayed
         and these can be downloaded in jpg, png, pdf. 
    
/*Part - B */
Now Step-1: To create an environment in google colab and load the csv data.
    // Pavan sir will share the data to you 
    Step-2: To perform edsa on it and find out which model is best. 
    //Need a complete day to woek on dis 
    Step-3: Now generate graphs. Make sure that u take input of (above mentioned attributes in frontend s-4) 
            so thta all the graphs are displayed.
    Step-4: After model giving accuracy in 88-98 range then upload the test data as sample data in 
            backend(ask panvan and ajay to do it). 
            
/*Important Links*/
- https://clerk.com/blog/setting-and-using-cookies-in-react
- https://github.com/the-debug-arena/React-Pdf-Multer-Backend/tree/main/files