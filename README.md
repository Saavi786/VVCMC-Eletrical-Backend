<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
   
</head>
<body>
    <div class="container">
        <h1>Meter Management API Backend</h1>
        <p>This is a Node.js Express backend for managing meter-related data and user authentication. The API provides RESTful endpoints for handling meter data (e.g., consumer information, images, responses) and user management (e.g., registration, login, password updates). This documentation is structured in a Swagger-like format for backend developers to understand the API's functionality, endpoints, and raw request/response formats.</p>

        <div class="table-of-contents">
            <h2>Table of Contents</h2>
            <ul>
                <li><a href="#overview">Overview</a></li>
                <li><a href="#technologies-used">Technologies Used</a></li>
                <li><a href="#setup">Setup</a></li>
                <li><a href="#api-endpoints">API Endpoints</a>
                    <ul>
                        <li><a href="#meter-data-endpoints">Meter Data Endpoints</a></li>
                        <li><a href="#user-authentication-endpoints">User Authentication Endpoints</a></li>
                    </ul>
                </li>
                <li><a href="#error-handling">Error Handling</a></li>
                <li><a href="#file-structure">File Structure</a></li>
                <li><a href="#dependencies">Dependencies</a></li>
            </ul>
        </div>

        <h2 id="overview">Overview</h2>
        <p>The Meter Management API supports two primary functionalities:</p>
        <ul>
            <li><strong>Meter Data Management</strong>: Create, read, update, and delete meter-related data, including Base64-encoded images for meters, timer panels, and poles. It also supports ward-wise counts and date-based filtering.</li>
            <li><strong>User Authentication</strong>: Register, login, update passwords, and delete admin users, with JWT-based authentication and bcrypt password hashing.</li>
        </ul>
        <p>All endpoints expect <code>Content-Type: application/json</code> for requests. Base64 images are saved to the filesystem, and unique identifiers are generated for records.</p>

        <h2 id="technologies-used">Technologies Used</h2>
        <ul>
            <li><strong>Node.js</strong>: Server-side JavaScript runtime.</li>
            <li><strong>Express.js</strong>: Web framework for routing and middleware.</li>
            <li><strong>MongoDB/Mongoose</strong>: NoSQL database and ORM for data storage.</li>
            <li><strong>Multer</strong>: Handles Base64 image uploads.</li>
            <li><strong>Moment-timezone</strong>: Date/time handling in Asia/Kolkata timezone.</li>
            <li><strong>UUID</strong>: Generates unique ApplicationIDs.</li>
            <li><strong>fs/path</strong>: Node.js modules for filesystem operations.</li>
            <li><strong>bcryptjs</strong>: Password hashing for secure storage.</li>
            <li><strong>jsonwebtoken</strong>: JWT-based authentication.</li>
            <li><strong>authMiddleware</strong>: Custom middleware for protecting routes.</li>
        </ul>

        <h2 id="setup">Setup</h2>
        <ol>
            <li><strong>Clone the Repository</strong>:
                <pre><code>git clone &lt;repository-url&gt;
cd &lt;repository-folder&gt;</code></pre>
            </li>
            <li><strong>Install Dependencies</strong>:
                <pre><code>npm install</code></pre>
            </li>
            <li><strong>Configure MongoDB</strong>:
                <p>Ensure MongoDB is running locally or provide a MongoDB URI. Update the connection string in your app (e.g., in <code>index.js</code> or a config file).</p>
            </li>
            <li><strong>Set Environment Variables</strong>:
                <p>Create a <code>.env</code> file in the root directory with:</p>
                <pre><code>PORT=3000
MONGO_URI=&lt;your-mongodb-uri&gt;
JWT_SECRET=vvcm</code></pre>
            </li>
            <li><strong>Start the Server</strong>:
                <pre><code>npm start</code></pre>
                <p>The server runs on <code>http://localhost:3000</code> (or the configured port).</p>
            </li>
        </ol>

        <h2 id="api-endpoints">API Endpoints</h2>

        <h3 id="meter-data-endpoints">Meter Data Endpoints</h3>

        <div class="endpoint">
            <h4>POST /add-data</h4>
            <p><strong>Description</strong>: Add new meter data with optional Base64 images.</p>
            <p><strong>Request Body</strong>:</p>
            <pre><code>{
  "WardCommittee": "string",
  "ConsumerID": "string",
  "NewMeterNumber": "string",
  "Purpose": "string",
  "Type": "string",
  "Address": "string",
  "MeterLatitude": "number",
  "MeterLongitude": "number",
  "SanctionLoad": "number",
  "TimerPanel": "boolean",
  "MeterImage": "string (Base64)",
  "TimerPanelImage": "string (Base64)"
}</code></pre>
            <p><strong>Responses</strong>:</p>
            <ul>
                <li><span class="response-status">201 Created</span>:
                    <pre><code>{
  "message": "Data saved successfully",
  "data": {
    "ApplicationID": "string",
    "WardCommittee": "string",
    "ConsumerID": "string",
    "NewMeterNumber": "string",
    "Purpose": "string",
    "Type": "string",
    "Address": "string",
    "MeterLatitude": "number",
    "MeterLongitude": "number",
    "SanctionLoad": "number",
    "TimerPanel": "boolean",
    "Date": "string (YYYY-MM-DD)",
    "Time": "string (HH:mm:ss)",
    "MeterImageData": "string (filename)",
    "TimerPanelImage": "string (filename)",
    "_id": "string",
    "__v": 0
  }
}</code></pre>
                </li>
                <li><span class="error-status">400 Bad Request</span>: ConsumerID already exists</li>
                <li><span class="error-status">500 Internal Server Error</span>: Server error</li>
            </ul>
        </div>

        <div class="endpoint">
            <h4>GET /get-new-data</h4>
            <p><strong>Description</strong>: Retrieve all meter data.</p>
            <p><strong>Response</strong>:</p>
            <ul>
                <li><span class="response-status">200 OK</span>:
                    <pre><code>[
  {
    "_id": "string",
    "ApplicationID": "string",
    "WardCommittee": "string",
    "ConsumerID": "string",
    "NewMeterNumber": "string",
    "Purpose": "string",
    "Type": "string",
    "Address": "string",
    "MeterLatitude": "number",
    "MeterLongitude": "number",
    "SanctionLoad": "number",
    "TimerPanel": "boolean",
    "Date": "string (YYYY-MM-DD)",
    "Time": "string (HH:mm:ss)",
    "MeterImageData": "string (filename)",
    "TimerPanelImage": "string (filename)",
    "Response": []
  }
]</code></pre>
                </li>
                <li><span class="error-status">500 Internal Server Error</span>: Server error</li>
            </ul>
        </div>

        <div class="endpoint">
            <h4>DELETE /delete-data/:ConsumerID</h4>
            <p><strong>Description</strong>: Delete meter data by ConsumerID.</p>
            <p><strong>Parameters</strong>:</p>
            <ul>
                <li><code>ConsumerID</code> (path): <code>string</code></li>
            </ul>
            <p><strong>Responses</strong>:</p>
            <ul>
                <li><span class="response-status">200 OK</span>:
                    <pre><code>{
  "message": "Data deleted successfully",
  "data": {}
}</code></pre>
                </li>
                <li><span class="error-status">404 Not Found</span>: Data not found</li>
                <li><span class="error-status">500 Internal Server Error</span>: Server error</li>
            </ul>
        </div>

        <div class="endpoint">
            <h4>POST /add-response/:ConsumerID</h4>
            <p><strong>Description</strong>: Add a response to the Response array for a ConsumerID.</p>
            <p><strong>Parameters</strong>:</p>
            <ul>
                <li><code>ConsumerID</code> (path): <code>string</code></li>
            </ul>
            <p><strong>Request Body</strong>:</p>
            <pre><code>{
  "WardCommittee": "string",
  "PoleName": "string",
  "HightofPole": "number",
  "TypeofBracket": "string",
  "Bracket": "string",
  "NumberLight": "number",
  "LightName": "string",
  "Watts": "number",
  "PoleLatitude": "number",
  "PoleLongitude": "number",
  "CableType": "string",
  "SubTypeName": "string",
  "CableWatts": "number",
  "PoleImage": "string (Base64)"
}</code></pre>
            <p><strong>Responses</strong>:</p>
            <ul>
                <li><span class="response-status">200 OK</span>:
                    <pre><code>{
  "message": "Response data added successfully",
  "data": {
    "_id": "string",
    "ConsumerID": "string",
    "Response": [
      {
        "WardCommittee": "string",
        "ConsumerID": "string",
        "TypeofPole": {
          "PoleName": "string",
          "HightofPole": "number",
          "TypeofBracket": "string",
          "Bracket": "string"
        },
        "TypeofLight": {
          "LightName": "string",
          "Watts": "number"
        },
        "NumberLight": "number",
        "PoleImageData": "string (filename)",
        "PoleLatitude": "number",
        "PoleLongitude": "number",
        "TypesofCable": {
          "CableType": "string",
          "SubTypeName": "string",
          "CableWatts": "number"
        },
        "Date": "string (YYYY-MM-DD)",
        "Time": "string (HH:mm:ss)",
        "_id": "string"
      }
    ]
  }
}</code></pre>
                </li>
                <li><span class="error-status">404 Not Found</span>: ConsumerID not found</li>
                <li><span class="error-status">500 Internal Server Error</span>: Server error</li>
            </ul>
        </div>

        <div class="endpoint">
            <h4>DELETE /delete-response/:ConsumerID/:responseId</h4>
            <p><strong>Description</strong>: Delete a specific response by ID.</p>
            <p><strong>Parameters</strong>:</p>
            <ul>
                <li><code>ConsumerID</code> (path): <code>string</code></li>
                <li><code>responseId</code> (path): <code>string</code></li>
            </ul>
            <p><strong>Responses</strong>:</p>
            <ul>
                <li><span class="response-status">200 OK</span>:
                    <pre><code>{
  "message": "Response deleted successfully",
  "data": {}
}</code></pre>
                </li>
                <li><span class="error-status">404 Not Found</span>: ConsumerID or Response not found</li>
                <li><span class="error-status">500 Internal Server Error</span>: Server error</li>
            </ul>
        </div>

        <div class="endpoint">
            <h4>GET /new-ward-count</h4>
            <p><strong>Description</strong>: Get ward-wise meter count.</p>
            <p><strong>Response</strong>:</p>
            <ul>
                <li><span class="response-status">200 OK</span>:
                    <pre><code>[
  {
    "wardCommittee": "string",
    "count": "number"
  }
]</code></pre>
                </li>
                <li><span class="error-status">500 Internal Server Error</span>: Server error</li>
            </ul>
        </div>

        <div class="endpoint">
            <h4>GET /ward-wise-response-count</h4>
            <p><strong>Description</strong>: Get ward-wise response count.</p>
            <p><strong>Response</strong>:</p>
            <ul>
                <li><span class="response-status">200 OK</span>:
                    <pre><code>[
  {
    "wardCommittee": "string",
    "count": "number"
  }
]</code></pre>
                </li>
                <li><span class="error-status">500 Internal Server Error</span>: Server error</li>
            </ul>
        </div>

        <div class="endpoint">
            <h4>GET /data/today</h4>
            <p><strong>Description</strong>: Get meter data for the current day.</p>
            <p><strong>Response</strong>:</p>
            <ul>
                <li><span class="response-status">200 OK</span>:
                    <pre><code>[
  {
    "_id": "string",
    "ApplicationID": "string",
    "WardCommittee": "string",
    "ConsumerID": "string",
    "Date": "2025-06-18"
  }
]</code></pre>
                </li>
                <li><span class="error-status">500 Internal Server Error</span>: Server error</li>
            </ul>
        </div>

        <div class="endpoint">
            <h4>GET /data/year-month?month=MM&year=YYYY</h4>
            <p><strong>Description</strong>: Get meter data for a specific month and year.</p>
            <p><strong>Query Parameters</strong>:</p>
            <ul>
                <li><code>month</code>: <code>string (MM)</code></li>
                <li><code>year</code>: <code>string (YYYY)</code></li>
            </ul>
            <p><strong>Response</strong>:</p>
            <ul>
                <li><span class="response-status">200 OK</span>:
                    <pre><code>[
  {
    "_id": "string",
    "ApplicationID": "string",
    "WardCommittee": "string",
    "ConsumerID": "string",
    "Date": "string (YYYY-MM-DD)"
  }
]</code></pre>
                </li>
                <li><span class="error-status">400 Bad Request</span>: Missing month or year</li>
                <li><span class="error-status">500 Internal Server Error</span>: Server error</li>
            </ul>
        </div>

        <div class="endpoint">
            <h4>PUT /update-consumer/:consumerId</h4>
            <p><strong>Description</strong>: Update consumer data, including optional Base64 images.</p>
            <p><strong>Parameters</strong>:</p>
            <ul>
                <li><code>consumerId</code> (path): <code>string</code></li>
            </ul>
            <p><strong>Request Body</strong>:</p>
            <pre><code>{
  "WardCommittee": "string",
  "NewMeterNumber": "string",
  "MeterImageData": "string (Base64)",
  "TimerPanelImage": "string (Base64)",
  "Response": [
    {
      "PoleImageData": "string (Base64)"
    }
  ]
}</code></pre>
            <p><strong>Responses</strong>:</p>
            <ul>
                <li><span class="response-status">200 OK</span>:
                    <pre><code>{
  "_id": "string",
  "WardCommittee": "string",
  "ConsumerID": "string",
  "NewMeterNumber": "string",
  "MeterImageData": "string (filename)",
  "Response": [
    {
      "PoleImageData": "string (filename)",
      "_id": "string"
    }
  ]
}</code></pre>
                </li>
                <li><span class="error-status">404 Not Found</span>: Document not found</li>
                <li><span class="error-status">400 Bad Request</span>: Invalid request</li>
                <li><span class="error-status">500 Internal Server Error</span>: Server error</li>
            </ul>
        </div>

        <h3 id="user-authentication-endpoints">User Authentication Endpoints</h3>

        <div class="endpoint">
            <h4>POST /login</h4>
            <p><strong>Description</strong>: Authenticate a user and return a JWT token.</p>
            <p><strong>Request Body</strong>:</p>
            <pre><code>{
  "Email": "string",
  "Password": "string"
}</code></pre>
            <p><strong>Responses</strong>:</p>
            <ul>
                <li><span class="response-status">200 OK</span>:
                    <pre><code>{
  "token": "string",
  "data": {
    "_id": "string",
    "Name": "string",
    "Email": "string",
    "Phone": "string",
    "Role": "string",
    "Ward": "string",
    "SuperAdmin": "boolean"
  }
}</code></pre>
                </li>
                <li><span class="error-status">400 Bad Request</span>: Invalid credentials</li>
                <li><span class="error-status">500 Internal Server Error</span>: Server error</li>
            </ul>
        </div>

        <div class="endpoint">
            <h4>POST /add-user</h4>
            <p><strong>Description</strong>: Register a new user with hashed password.</p>
            <p><strong>Request Body</strong>:</p>
            <pre><code>{
  "Name": "string",
  "Email": "string",
  "Phone": "string",
  "Password": "string",
  "Role": "string",
  "Ward": "string",
  "SuperAdmin": "boolean"
}</code></pre>
            <p><strong>Responses</strong>:</p>
            <ul>
                <li><span class="response-status">201 Created</span>:
                    <pre><code>{
  "message": "User registered successfully"
}</code></pre>
                </li>
                <li><span class="error-status">400 Bad Request</span>: User already exists</li>
                <li><span class="error-status">500 Internal Server Error</span>: Server error</li>
            </ul>
        </div>

        <div class="endpoint">
            <h4>DELETE /delete-user/:Email</h4>
            <p><strong>Description</strong>: Delete a user by Email.</p>
            <p><strong>Parameters</strong>:</p>
            <ul>
                <li><code>Email</code> (path): <code>string</code></li>
            </ul>
            <p><strong>Responses</strong>:</p>
            <ul>
                <li><span class="response-status">200 OK</span>:
                    <pre><code>{
  "message": "User deleted successfully"
}</code></pre>
                </li>
                <li><span class="error-status">404 Not Found</span>: User not found</li>
                <li><span class="error-status">500 Internal Server Error</span>: Server error</li>
            </ul>
        </div>

        <div class="endpoint">
            <h4>PUT /update-password</h4>
            <p><strong>Description</strong>: Update a user's password.</p>
            <p><strong>Request Body</strong>:</p>
            <pre><code>{
  "Email": "string",
  "newPassword": "string"
}</code></pre>
            <p><strong>Responses</strong>:</p>
            <ul>
                <li><span class="response-status">200 OK</span>:
                    <pre><code>{
  "message": "Password updated successfully",
  "user": {
    "_id": "string",
    "Name": "string",
    "Email": "string",
    "Phone": "string",
    "Role": "string",
    "Ward": "string",
    "SuperAdmin": "boolean"
  }
}</code></pre>
                </li>
                <li><span class="error-status">404 Not Found</span>: User not found</li>
                <li><span class="error-status">500 Internal Server Error</span>: Server error</li>
            </ul>
        </div>

        <div class="endpoint">
            <h4>GET /user</h4>
            <p><strong>Description</strong>: Get authenticated user data (requires JWT).</p>
            <p><strong>Headers</strong>:</p>
            <ul>
                <li><code>Authorization</code>: <code>Bearer &lt;token&gt;</code></li>
            </ul>
            <p><strong>Response</strong>:</p>
            <ul>
                <li><span class="response-status">200 OK</span>:
                    <pre><code>{
  "userData": {
    "user": {
      "Email": "string",
      "id": "string",
      "SuperAdmin": "boolean"
    }
  }
}</code></pre>
                </li>
                <li><span class="error-status">500 Internal Server Error</span>: Server error</li>
            </ul>
        </div>

        <div class="endpoint">
            <h4>GET /get-user</h4>
            <p><strong>Description</strong>: Retrieve all admin users.</p>
            <p><strong>Response</strong>:</p>
            <ul>
                <li><span class="response-status">200 OK</span>:
                    <pre><code>[
  {
    "_id": "string",
    "Name": "string",
    "Email": "string",
    "Phone": "string",
    "Role": "string",
    "Ward": "string",
    "SuperAdmin": "boolean"
  }
]</code></pre>
                </li>
                <li><span class="error-status">500 Internal Server Error</span>: Server error</li>
            </ul>
        </div>

        <h2 id="error-handling">Error Handling</h2>
        <p>The API uses standard HTTP status codes with JSON error messages:</p>
        <ul>
            <li><span class="error-status">400 Bad Request</span>: Duplicate ConsumerID, invalid credentials, or missing parameters.</li>
            <li><span class="error-status">404 Not Found</span>: Resource (e.g., ConsumerID, user, or response) not found.</li>
            <li><span class="error-status">500 Internal Server Error</span>: Database or filesystem issues.</li>
        </ul>
        <p><strong>Example Error Response</strong>:</p>
        <pre><code>{
  "message": "Consumer ID already exists"
}</code></pre>

 

        <h2 id="dependencies">Dependencies</h2>
        <p>Install dependencies using:</p>
        <pre><code>npm install express mongoose multer moment-timezone uuid bcryptjs jsonwebtoken</code></pre>
        <ul>
            <li><strong>express</strong>: Web framework.</li>
            <li><strong>mongoose</strong>: MongoDB ORM.</li>
            <li><strong>multer</strong>: Base64 image uploads.</li>
            <li><strong>moment-timezone</strong>: Date/time formatting.</li>
            <li><strong>uuid</strong>: Unique ID generation.</li>
            <li><strong>bcryptjs</strong>: Password hashing.</li>
            <li><strong>jsonwebtoken</strong>: JWT authentication.</li>
            <li><strong>fs, path</strong>: Filesystem operations.</li>
        </ul>
    </div>
</body>
</html>
