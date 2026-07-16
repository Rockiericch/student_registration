<?php

include("db_connect.php");


// Get form data

$student_id = $_POST['student_id'];
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$gender = $_POST['gender'];
$date_of_birth = $_POST['date_of_birth'];
$telephone = $_POST['telephone'];
$email = $_POST['email'];
$address = $_POST['address'];
$department_id = $_POST['department'];
$programme_id = $_POST['programme'];
$level_id = $_POST['level'];
$username = $_POST['username'];

$password = password_hash($_POST['password'], PASSWORD_DEFAULT);


// Check if student ID already exists

$check = "SELECT * FROM students WHERE student_id='$student_id'";

$result = $conn->query($check);


if($result->num_rows > 0){

    // Duplicate ID error page

    ?>

    <!DOCTYPE html>
    <html>
    <head>
        <title>Registration Error</title>
        <link rel="stylesheet" href="error.css">
    </head>

    <body>

        <div class="error-card">

            <div class="icon">
                !
            </div>

            <h1>Registration Failed</h1>

            <p>
                This Student ID is already registered.
                Please use another Student ID.
            </p>

            <a href="index.php">
                Go Back
            </a>

        </div>

    </body>
    </html>


    <?php

    exit();


}


// Insert student if ID does not exist

$sql = "INSERT INTO students(

student_id,
first_name,
last_name,
gender,
date_of_birth,
telephone,
email,
address,
department_id,
programme_id,
level_id,
username,
password

)

VALUES(

'$student_id',
'$first_name',
'$last_name',
'$gender',
'$date_of_birth',
'$telephone',
'$email',
'$address',
'$department_id',
'$programme_id',
'$level_id',
'$username',
'$password'

)";



if($conn->query($sql) === TRUE){

    // Successful registration

    header("Location: success.php");
    exit();

}
else{

    echo "Error: " . $conn->error;

}



$conn->close();

?>