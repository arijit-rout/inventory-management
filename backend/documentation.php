<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dynamic CRUD API Documentation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
        h1 {
            text-align: center;
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        table, th, td {
            border: 1px solid #ccc;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        .endpoint {
            margin-bottom: 30px;
        }
        .method {
            font-weight: bold;
        }
        .description {
            margin-left: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Dynamic CRUD API Documentation</h1>
        
        <div class="endpoint">
            <h2>GET</h2>
            <p class="method">Method: GET</p>
            <p class="description">Retrieve data from the database.</p>
            <table>
                <thead>
                    <tr>
                        <th>Endpoint</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>/api.php?table={table_name}</td>
                        <td>Retrieve all records from a specific table.</td>
                    </tr>
                    <tr>
                        <td>/api.php?table={table_name}&id={id}</td>
                        <td>Retrieve a specific record from a table by ID.</td>
                    </tr>
                    <tr>
                        <td>/api.php?table={table_name}&field={field_name}&value={value}</td>
                        <td>Retrieve records from a table where a specific field matches a value.</td>
                    </tr>
                    <tr>
                        <td>/api.php?table={table_name}&page={page_number}&perPage={items_per_page}</td>
                        <td>Retrieve paginated records from a table.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="endpoint">
            <h2>POST</h2>
            <p class="method">Method: POST</p>
            <p class="description">Create a new record in the database.</p>
            <table>
                <thead>
                    <tr>
                        <th>Endpoint</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>/api.php?table={table_name}</td>
                        <td>Create a new record in the specified table.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="endpoint">
            <h2>PUT</h2>
            <p class="method">Method: PUT</p>
            <p class="description">Update an existing record in the database.</p>
            <table>
                <thead>
                    <tr>
                        <th>Endpoint</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>/api.php?table={table_name}&id={id}</td>
                        <td>Update an existing record in the specified table by ID.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="endpoint">
            <h2>DELETE</h2>
            <p class="method">Method: DELETE</p>
            <p class="description">Delete a record from the database.</p>
            <table>
                <thead>
                    <tr>
                        <th>Endpoint</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>/api.php?table={table_name}&id={id}</td>
                        <td>Delete a record from the specified table by ID.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>
