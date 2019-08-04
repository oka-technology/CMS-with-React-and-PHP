<?php
  function convertAuthority($authorityNum){
    $authorityBinary = decbin((int) $authorityNum);
    $authorityBinaryFilled = sprintf('%03d', $authorityBinary);
    $authorityBinaryArray = str_split($authorityBinaryFilled);
    return $authorityBinaryArray;
  }

  session_start();

  if (!$_SESSION['user']) {
    header('Location: index.php');
    exit();
  }

  $authority = $_SESSION['authority'];
  $convertedAuthority = convertAuthority($authority);
  if ($convertedAuthority[1] != 1) {
    header('Location: index.php');
    exit();
  }

  try{ 
    $dbh = new PDO(
      'mysql:host=db;dbname=webproLastAssignmentdb',
      'user',
      'password'
    );
    $stmt = $dbh->prepare(
      'select * from categories;'
    );
    $stmt->execute();

    while($rowOfCategories = $stmt->fetch(PDO::FETCH_ASSOC)){
      $categoryListHTML .= "
        <li>
          <ul>
            <li>{$rowOfCategories['id']}</li>
            <li>{$rowOfCategories['name']}</li>
            <li><a href='editCategory.php?id={$rowOfCategories['id']}'>編集</a></li>
          </ul>
        </li>
      ";
    }
?>

<!DOCTYPE html>
<html lang="ja-JP">
<head>
  <meta charset="UTF-8">
  <title>カテゴリ一覧</title>
</head>
<body>
  <h1>カテゴリ</h1>
  <a href="addCategory.php">新規登録</a>
  <ul>
    <li>
      <ul>
        <li>ID</li>
        <li>タイトル</li>
      </ul>
    </li>
    <?= $categoryListHTML ?>
</body>
</html>

<?php
  } catch (PDOException $e) {
    var_dump($e);
  }
