Client-Server Model Architecture 

In the client-server architecture, when the client computer sends a request for data to the server through the internet, the server accepts the requested process and deliver the data packets requested back to the client. Clients do not share any of their resources. Examples of Client-Server Model are Email, World Wide Web.

There is a way in which browser interacts with the servers, which includes the following steps :

1. User enters the URL(Uniform Resource Locator) of the website or file. The Browser then requests the DNS(DOMAIN NAME SYSTEM) Server.

2. DNS Server lookup for the address of the WEB Server.

3. DNS Server responds with the IP address of the WEB Server.

4. Browser sends over an HTTP/HTTPS request to WEB Server’s IP (provided by DNS server).

5. Server sends over the necessary files of the website.

6. Browser then renders the files and the website is displayed. This rendering is done with the help of DOM (Document Object Model) interpreter, CSS interpreter and JS Engine collectively known as the JIT or (Just in Time) Compilers.

Advantages of Client-Server model:

1. Centralized system with all data in a single place.
2. Cost efficient requires less maintenance cost and Data recovery is possible.
3. The capacity of the Client and Servers can be changed separately.