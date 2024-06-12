<?php
// Allow from any origin
header("Access-Control-Allow-Origin: *");

// Allow specific methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

header('Content-Type: application/json');
class DynamicCRUDAPI {
    private $pdo;

    public function __construct($host, $db, $user, $pass) {
        $dsn = "mysql:host=$host;dbname=$db";
        $this->pdo = new PDO($dsn, $user, $pass);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    // CREATE
    public function create($tableName, $data) {
        $fields = implode(',', array_keys($data));
        $placeholders = implode(',', array_fill(0, count($data), '?'));

        $stmt = $this->pdo->prepare("INSERT INTO $tableName ($fields) VALUES ($placeholders)");
        $stmt->execute(array_values($data));

        return $this->pdo->lastInsertId();
    }

    // READ ONE
    public function readOne($tableName, $idField, $idValue) {
        $stmt = $this->pdo->prepare("SELECT * FROM $tableName WHERE $idField = ?");
        $stmt->execute(array($idValue));

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // READ ALL
    public function readAll($tableName) {
        $stmt = $this->pdo->query("SELECT * FROM $tableName");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // UPDATE
    public function update($tableName, $data, $idField, $idValue) {
        $setValues = array();
        foreach ($data as $field => $value) {
            $setValues[] = "$field = ?";
        }
        $setValues = implode(',', $setValues);

        $stmt = $this->pdo->prepare("UPDATE $tableName SET $setValues WHERE $idField = ?");
        $stmt->execute(array_merge(array_values($data), array($idValue)));

        return $stmt->rowCount();
    }

    // DELETE
    public function delete($tableName, $idField, $idValue) {
        $stmt = $this->pdo->prepare("DELETE FROM $tableName WHERE $idField = ?");
        $stmt->execute(array($idValue));

        return $stmt->rowCount();
    }

    // SEARCH
    public function search($tableName, $field, $value) {
        $stmt = $this->pdo->prepare("SELECT * FROM $tableName WHERE $field = ?");
        $stmt->execute(array($value));

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // PAGINATE
    public function paginate($tableName, $page, $perPage) {
        $offset = ($page - 1) * $perPage;
        $stmt = $this->pdo->prepare("SELECT * FROM $tableName LIMIT $perPage OFFSET $offset");
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // RESTful API Methods
    public function handleRequest() {
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case 'GET':
                $this->handleGET();
                break;
            case 'POST':
                $this->handlePOST();
                break;
            case 'PUT':
                $this->handlePUT();
                break;
            case 'DELETE':
                $this->handleDELETE();
                break;
            default:
                http_response_code(405);
                echo json_encode(array("message" => "Method Not Allowed"));
        }
    }

    // Handle GET Request
    private function handleGET() {
        $tableName = $_GET['table'];
        if (isset($_GET['id'])) {
            $idField = 'id'; // Assuming the primary key is 'id'
            $idValue = $_GET['id'];
            echo json_encode($this->readOne($tableName, $idField, $idValue));
        } else {
            echo json_encode($this->readAll($tableName));
        }
    }

    // Handle POST Request
    private function handlePOST() {
        // echo "I am Here";
        $tableName = $_GET['table'];
        $data = json_decode(file_get_contents("php://input"), true);
        if(isset($data["method"]) && $data["method"]=="login")
        {
            echo JSON_encode($this->login($tableName, $data));
        }else{
            echo json_encode(array("id" => $this->create($tableName, $data)));
        }
    }

    // Handle PUT Request
    private function handlePUT() {
        $tableName = $_GET['table'];
        $idField = 'id'; // Assuming the primary key is 'id'
        $idValue = $_GET['id'];
        $data = json_decode(file_get_contents("php://input"), true);
        echo json_encode(array("rows_affected" => $this->update($tableName, $data, $idField, $idValue)));
    }

    // Handle DELETE Request
    private function handleDELETE() {
        $tableName = $_GET['table'];
        $idField = 'id'; // Assuming the primary key is 'id'
        $idValue = $_GET['id'];
        echo json_encode(array("rows_affected" => $this->delete($tableName, $idField, $idValue)));
    }


    // CREATE
    public function login($tableName, $data) {
        $email = $data['email'];
        $password = $data['password'];
    
        // Prepare the statement to fetch the user record
        $stmt = $this->pdo->prepare("SELECT * FROM $tableName WHERE email = ? AND password=MD5(?)");
        $stmt->execute([$email, $password]);
    
        // Fetch the user record
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
        // Verify the password
        if ($user ) {
            // Password is correct, return user data or a token
            return [
                "success" => true,
                "user" => $user
            ];
        } else {
            // Invalid credentials
            return [
                "success" => false,
                "user" =>  null
            ];
        }
    }
}

// __construct($host, $db, $user, $pass)

// Example usage
$db = new DynamicCRUDAPI('localhost', 'inventory_management', 'root', '');

// Handle the request
$db->handleRequest();
?>
