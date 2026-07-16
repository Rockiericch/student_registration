<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Registration Successful</title>

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Segoe UI,sans-serif;
}

body{
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background:linear-gradient(135deg,#0F172A,#1E40AF);
}

.card{
    background:white;
    width:420px;
    padding:40px;
    border-radius:20px;
    text-align:center;
    box-shadow:0 20px 50px rgba(0,0,0,.2);
}

.check{
    width:90px;
    height:90px;
    border-radius:50%;
    background:#22c55e;
    color:white;
    margin:auto;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:50px;
    margin-bottom:20px;
}

h1{
    color:#1E40AF;
    margin-bottom:15px;
}

p{
    color:#555;
    line-height:1.6;
    margin-bottom:25px;
}

.btn{
    display:inline-block;
    text-decoration:none;
    background:#2563EB;
    color:white;
    padding:12px 25px;
    border-radius:10px;
    transition:.3s;
}

.btn:hover{
    background:#1D4ED8;
}

</style>

</head>
<body>

<div class="card">

    <div class="check">
        ✓
    </div>

    <h1>Registration Successful!</h1>

    <p>
        Your registration details have been submitted successfully.
        Thank you for registering.
    </p>

    <a href="index.php" class="btn">
        Register Another Student
    </a>

</div>

</body>
</html>