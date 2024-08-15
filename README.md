<h1>QuickFood (An OnLine Food Delivery App)</h1> 
<br />
<h3>Links:</h3> <br />

The frontend of the app is hosted on Vercel and the backend is hosted on Render. The database is hosted on Aiven.

<br/>

<b> The live link of the app is: </b>

<p align="center">
  <a href="https://quick-food-delta.vercel.app/">
    <img src="./README/url_img.png" alt="QuickFood" width="300" height="200">
  </a>
</p>


<br/>

<b> Sample Users: </b>
<br/>
These are some sample user accounts using which you can login to the app and see the features.
<br/>

| Serial No | ID                          | Role                          | Password |
|-----------|-----------------------------|-------------------------------|----------|
| 1         | webprojecttest63@gmail.com  | User(mainly customer)         | pass     |
| 2         | user1@gmail.com             | User(mainly restaurant_owner) | pass     |
| 3         | rider_1                     | Rider                         | pass     |
| 4         | ADMIN                       | Admin                         | pass     |

<br/>

<b> Youtube demonstration link: </b>
<br/>
<p> A youtube demonstration link of the app is also given below. You can see the demonstration and know the features of the app: </p>
<br/>

<p align="center">
  <a href="https://youtu.be/CQKs_RtvfpY?si=Btow64LsTLCOsQmS">
    <img src="./README/youtube_logo.png" alt="QuickFood" width="300" height="200">
  </a>
</p>
<br/>
<br/>
<hr/>
<br/>
The QuickFood app aims to revolutionize the takeout experience by providing a seamless platform for ordering from local restaurants and ensuring timely delivery. It offers a user-friendly interface for easy navigation and order placement, along with a robust review system for user feedback. Restaurant owners benefit from analytical tools to track sales, customer reviews, and repeat rates, enabling data-driven improvements. This approach fosters a symbiotic ecosystem where users enjoy convenience and variety, while local restaurants thrive by adapting to customer preferences.
<br /> <br />

<h3> User Profiles: </h3>

QuickFood web application caters to several distinct user classes, each with unique roles,
needs, and privileges:

<h4> 1. Food Delivery Riders: </h4>

**Characteristics:** Food delivery riders are individuals responsible for transporting orders from restaurants to customers' locations. They typically possess strong navigational skills and the ability to work efficiently in fast-paced environments.

**Functionality:** Riders utilize the QuickFood app to receive order assignments, view delivery instructions, and navigate optimal routes for timely deliveries. They will also provide updates on order status and communicate with customers as needed.

<h4> 2. Restaurant Owners: </h4>

**Characteristics:** Restaurant managers oversee the operations of their
respective establishments, including menu management and order
processing. They require access to administrative functionalities to
efficiently manage their restaurant's presence on the QuickFood platform.

**Functionality:** Restaurant managers utilize the QuickFood admin dashboard to update menu items, manage order queues, and monitor performance metrics. They may also interact with customer feedback and reviews to maintain quality standards and enhance customer satisfaction.

<h4> 3. Customers: </h4>

**Characteristics:** Customers are individuals who use the QuickFood app to browse restaurants, place food orders, and track delivery status. They may vary in preferences, dietary requirements, and ordering habits.

**Functionality:** Customers access the QuickFood platform to explore restaurant listings, browse menus, place orders, and make payments securely. They can track the status of their orders in real-time and provide feedback on their dining experiences.

<h4> 4. Admin: </h4>

**Characteristics:** The admin user class possesses elevated privileges and responsibilities for overseeing the overall operation and management of the QuickFood platform. Admins ensure smooth functioning, enforce policies, and handle escalated issues.

**Functionality:** Admins have access to comprehensive administrative tools within the QuickFood platform to manage user accounts, resolve disputes, enforce policies, and perform system maintenance tasks. They play a crucial role in ensuring platform integrity, security, and adherence to regulatory standards.

<h3>Feature Details:</h3> <br />

**User Authentication:** Authentication is required for users to access restricted features and make transactions on the food delivery web app securely. Users can authenticate themselves through email/password whereas employees can do so using employee ID and password. The authentication process verifies the user's identity and grants access to authorized functionalities based on their role. This app includes Google Oauth2 authentication and email.js service for gmail verification as well.

**User Account Management:** QuickFood will offer comprehensive user registration, login, and profile management features, enabling users to create and maintain personalized accounts. Users can update personal information, view order history, and save favorite restaurants for future orders.

**Restaurant and Food Discovery:** QuickFood will empower users to explore a diverse range of restaurants and culinary offerings through intuitive browsing and robust search functionalities. Users can discover nearby eateries, explore menus, and filter options based on cuisine, price range, and dietary preferences.

**Advanced Search and Filter Options:** QuickFood will provide users with powerful search and filter functionalities to enhance their dining experience. Users can effortlessly search for restaurants by name using the search bar and apply various filters to narrow down their choices. These filters will include menu items, price range, category (e.g.,Non-vegetarian, Vegetarian, Vegan, Drink), and customer ratings, allowing users to find the perfect dining option that meets their preferences and needs.

**Restaurant & Menu Management Tools:** QuickFood will equip restaurant partners with dedicated management tools to streamline menu updates and order processing. Restaurants can efficiently manage incoming orders, update menu offerings, and track performance metrics to optimize operations.

**Order Management:** Users will have the ability to effortlessly place, customize, and cancel food orders according to their preferences. QuickFood will streamline the ordering process, allowing users to specify delivery instructions, select preferred delivery times, and manage multiple orders simultaneously.

**Secure Payment Processing:** QuickFood will try to integrate reliable payment gateways to facilitate seamless and secure online transactions for food orders. Users can confidently complete payments using various methods such as credit/debit cards, digital wallets, or other preferred payment options.

**Real-Time Order Tracking:** To enhance transparency and convenience, QuickFood will try to provide real-time tracking of order status and delivery progress via notifications. Users can monitor the journey of their orders from preparation to doorstep delivery, ensuring timely arrival and minimizing uncertainties.

**Rating and Review System:** QuickFood will implement a robust rating and review system, allowing users to provide feedback on their food delivery experiences. Users can rate restaurants, delivery services, and individual food items, helping to foster transparency and accountability within the platform.

**Real-Time Notifications and Chat:** QuickFood will keep users informed and connected with real-time notifications and chat features. Users will receive instant updates about their order progress, while riders and restaurant owners will be notified promptly about new orders. Additionally, a dedicated chat room will be established between customers and riders, enabling seamless communication regarding delivery details, special instructions, and any other queries, ensuring a smooth and efficient order fulfillment process.

**Sale & Performance Analysis:** QuickFood will empower administrators and restaurant owners with comprehensive sale and performance analysis tools. Through intuitive charts and visualizations, such as bar charts, doughnut charts, line charts, and pie charts, they can monitor the sales rates and ratings of individual food items. Administrators can also analyze the performance of different restaurants and riders, gaining valuable insights to make data-driven decisions. This feature ensures that all stakeholders have a clear understanding of their performance metrics, helping to identify areas for improvement and optimize overall operations.

**Responsive Design:** The web application is designed with a responsive layout, ensuring seamless user experience across different devices and screen sizes.
<br /> <br />
<h3>Integrations of Advanced Functionalities:</h3> <br />
<b>Gmail Authentication with OAuth 2.0:</b><br />
OAuth 2.0 enables users to log in to the platform securely using their Gmail accounts through OAuth 2.0 authentication. This integration provides a seamless and trusted login experience for users, leveraging their existing Gmail credentials without the need to create a separate account.
<br /><br />
<b>Email Verification with Email.js & OTP:</b><br />
The Email.js service enhances security during user registration by sending a One-Time Password (OTP) to the user's Gmail account. Users must verify the OTP before it expires to complete the registration process. This integration ensures a secure and seamless verification experience, leveraging Email.js to deliver the OTP swiftly and reliably to the user's Gmail, thereby adding an extra layer of security to the registration process.
<br /> <br />
<b>Real-time Communication with Web-Sockets:</b><br />Implements real-time notification & chat feature using web-socket. This feature enables customers and riders to engage in instant messaging within the platform along with real-time delivery status via notifications. Web-Socket facilitates bidirectional communication between the client and server, allowing messages to be sent and received in real-time allowing increased user experience through seamless communication.
<br /> <br />
<b>Infinite Scrolling in Restaurant, Menu and Chat Pages:</b><br />Implements infinite scrolling functionality on various pages of the platform, including restaurant list, menu list and chat conversations. Instead of traditional pagination, where users navigate through pages of content, infinite scrolling dynamically loads additional content as the user scrolls down the page, providing a seamless and uninterrupted browsing experience.
<br /> <br />
<b>Integration of Stripe Payment Gateway:</b><br />
Integrates the Stripe payment gateway to facilitate secure and seamless transactions on the platform. Users can effortlessly complete payments using their preferred payment methods without leaving the app. Stripe ensures a smooth and reliable payment process, enhancing user trust and convenience by providing a trusted and widely accepted payment solution.
<br /> <br />
<b>Integration of Google Maps:</b><br />
Integrates Google Maps to enhance the delivery process by allowing customers to easily set their delivery address and enabling riders to efficiently navigate to the destination. This integration ensures accurate address placement and optimized delivery routes, providing a smoother and more reliable delivery experience for both customers and riders.
<h3>Tech-Stack Used in the Project:</h3> <br />
<b>Front-End Technology:</b>
<br />

- Next JS
- TailwindCSS
- Lottie Animations
- DaisyUI (UI Library)
- ShadCN (UI Library)

<br />
<b>Back-End Technology:</b>
<br />

- Spring Boot
- Socket (implementing real time notification & chat feature)

<br />
<b>Database:</b>
<br />

- MySQL

<br />


<br />
<h3>Local Development:</h3> <br />

<b>Environment variables that need to update:</b>

<b>Client:</b>

| Variable Name                   | Value                                                                      |
|---------------------------------|----------------------------------------------------------------------------|
| NEXT_PUBLIC_SERVER_URL          | URL where spring boot server is running (By default http://localhost:8080) |
| NEXT_PUBLIC_CLIENT_URL          | URL where next js client is running (By default http://localhost:3000)     |
| NEXT_PUBLIC_OAUTH_CLIENT_ID     | Your OAUTH_CLIENT_ID                                                       |
| NEXT_PUBLIC_OAUTH_CLIENT_SECRET | Your OAUTH_CLIENT_SECRET                                                   |
| NEXT_PUBLIC_MAP_API_KEY         | Your Google_Map_API_Key                                                    |
| NEXT_PUBLIC_EMAILJS_SERVICE_ID  | Your EmailJS_Service_ID                                                    |
| NEXT_PUBLIC_EMAILJS_TEMPLATE_ID | Your EMAILJS_TEMPLATE_ID                                                   |
| NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  | Your EMAILJS_PUBLIC_KEY                                                    |

<b>Server:</b>

| Variable Name                   | Value                                                                      |
|---------------------------------|----------------------------------------------------------------------------|
| SPRING_DATASOURCE_URL           | jdbc:mysql://localhost:3306/{Your_Database_Name}                           |
| SPRING_DATASOURCE_USERNAME      | Your database username (You can use "root" user)                           |
| SPRING_DATASOURCE_PASSWORD      | Password of the database user                                              |
| CLIENT_URL                      | URL where next js client is running (By default http://localhost:3000)     |
| JWT_SECRET                      | Your JWT_Secret_Key                                                        |
| STRIPE_SECRET_KEY               | Your STRIPE_SECRET_KEY                                                     |

<b>DB (This portion is needed only for docker build):</b>

| Variable Name                   | Value                                                                      |
|---------------------------------|----------------------------------------------------------------------------|
| MYSQL_DATABASE                  | Your Database Name (eg "Quick_Food_Database")                              |
| MYSQL_USER                      | Your database username (You can use "root" user)                           |
| MYSQL_ROOT_PASSWORD             | Set the required passwor here                                              |
| MYSQL_PASSWORD                  | Set the required passwor here                                              |

<br />

You have the flexibility to build the project either locally or with Docker. Building locally involves installing necessary tools and executing build commands, while Docker provides a consistent environment with its Dockerfile and image creation process. 
<br /> <br />
<b>Using Docker:</b><br />
At first come to the base directory of the project. Then set the value of the environment variables listed above in the compose.yml (from base directory the path of the file is "./compose.yml") file. Then run the following command in terminal.

```bash
docker compose up -d --build
```

This will build your client and server in docker containers including all necessary dependencies.
<br /><br />
<span style="color:green">
NB: Your client running in docker container is mapped with port 3000 of your localhost. Your server running in docker container is mapped with port 8080 of your localhost. Your database running in docker container is mapped with port 3307 of your localhost.
</span>
<br />
<br />
You can open your client on this link: 

http://localhost:3000

<b>Without Docker:</b><br />
At first let's build the client locally. Come to the base directory of the project and then create a .env file in the client folder (from base directory the path of the file is "./client/.env"). Then place the environment variables of the client section listed above with required values. Then from base directory, run the following commands in terminal.

```bash
cd client
npm install
npm run dev
```

This will start your react development server. To build your react client project, you can run this command:

```bash
npm run build
```

Now let's build the MySQL database locally. Run the following command in terminal.

```bash
mysql -u root -p -e "CREATE DATABASE Quick_Food_Database;"
```

This will create an empty database. If you want to insert some sample data, then you can add them from the dumped database file. For this, first come to the base  directory of the project. Then run the following command.

```bash
cd Resources
mysql -u root -p Quick_Food_Database < QuickFood_DumpedDB.sql
```

This will add some sample data in your database. And here your database is ready.

<br />
Now let's build the backend server locally. Come to the base directory of the project and then open the server folder. You can use an IDE <b>(INTELLIJ IDEA Recommended)</b> to run the server of your application. But you must have the <b>Lombok Plugin</b> installed in your <b>INTELLIJ IDEA</b> to run the spring boot server.

To set the environment variables for server open the application.yml (from base directory the path of the file is "./server/src/main/resources/application.yml") file and replace the environment variables of server section listed above with their corresponding values.

This will start your spring boot backend server.<br/>
Your backend server will be running on port 8080.

You can open your app on this link: 

http://localhost:3000

<br /><br />

<h3>Some images of the project:</h3> <br />

<p align="center">
  <img src="./README/img1.png" alt="Alt text" title="Optional title">
</p>

<p align="center">
  <img src="./README/img2.png" alt="Alt text" title="Optional title">
</p>

<p align="center">
  <img src="./README/img3.png" alt="Alt text" title="Optional title">
</p>

<p align="center">
  <img src="./README/img5.png" alt="Alt text" title="Optional title">
</p>

<p align="center">
  <img src="./README/img6.png" alt="Alt text" title="Optional title">
</p>

<p align="center">
  <img src="./README/img9.png" alt="Alt text" title="Optional title">
</p>

<p align="center">
  <img src="./README/img10.png" alt="Alt text" title="Optional title">
</p>

<p align="center">
  <img src="./README/img11.png" alt="Alt text" title="Optional title">
</p>

<p align="center">
  <img src="./README/img14.png" alt="Alt text" title="Optional title">
</p>

<p align="center">
  <img src="./README/img8.png" alt="Alt text" title="Optional title">
</p>

<p align="center">
  <img src="./README/img12.png" alt="Alt text" title="Optional title">
</p>

<p align="center">
  <img src="./README/img16.png" alt="Alt text" title="Optional title">
</p>

<p align="center">
  <img src="./README/img17.png" alt="Alt text" title="Optional title">
</p>

<p align="center">
  <img src="./README/img18.png" alt="Alt text" title="Optional title">
</p>

<p align="center">
  <img src="./README/img19.png" alt="Alt text" title="Optional title">
</p>

<p align="center">
  <img src="./README/img20.png" alt="Alt text" title="Optional title">
</p>

<p align="center">
  <img src="./README/img7.png" alt="Alt text" title="Optional title">
</p>

<p align="center">
  <img src="./README/img4.png" alt="Alt text" title="Optional title">
</p>

<p align="center">
  <img src="./README/img13.png" alt="Alt text" title="Optional title">
</p>

<p align="center">
  <img src="./README/img15.png" alt="Alt text" title="Optional title">
</p>

<br/><br/>

The QuickFood app is poised to revolutionize the food delivery industry by offering a seamless, user-friendly platform that caters to the needs of customers, restaurant owners, and delivery riders alike. With its robust feature set, including real-time order tracking, secure payment processing, and advanced search and filtering options, QuickFood ensures a convenient and satisfying experience for users. Restaurant owners benefit from powerful management tools and performance analytics, while delivery riders can efficiently manage orders and routes. The integration of advanced functionalities like OAuth 2.0, Email.js for OTP verification, WebSockets for real-time communication, and Google Maps for navigation further enhances the platform's reliability and efficiency. By fostering a symbiotic ecosystem, QuickFood enables local restaurants to thrive and customers to enjoy a wide variety of dining options delivered right to their doorstep.