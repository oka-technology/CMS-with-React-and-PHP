<?php
  require_once('showAuthority.php');
  session_start();

  if (!$_SESSION['user']) {
    header('Location: index.php');
    exit();
  }

  $userID = $_SESSION['user'];
  $authority = $_SESSION['authority'];
?>

<header class="header">
  <p class="header__siteName">CMS</p>
  <div class="header__right">
    <p class="header__right__loginUser"><?= $userID ?> でログイン中（<?= showAuthority($authority) ?>）</p>
    <p class="header__right__logoutLink">
      <a href="logoutProcess.php" class="header__right__logoutLink--anchor">
        <svg class="header__right__logoutLink--img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 570 487.88"><title>logout</title><polygon points="154.48 349.66 99.43 276.61 362.26 276.61 362.26 212.83 99.43 212.83 154.48 139.78 79.09 139.78 0 244.72 79.09 349.66 154.48 349.66"/><path d="M379,643.94a78.27,78.27,0,0,1-78.18-78.18V504.65h61.78v61.11a16.62,16.62,0,0,0,16.4,16.4H606.82a16.62,16.62,0,0,0,16.4-16.4V234.24a16.62,16.62,0,0,0-16.4-16.4H379a16.62,16.62,0,0,0-16.4,16.4v61H300.8v-61A78.27,78.27,0,0,1,379,156.06H606.82A78.27,78.27,0,0,1,685,234.24V565.76a78.27,78.27,0,0,1-78.18,78.18Z" transform="translate(-115 -156.06)"/></svg>
        Logout
      </a>
    </p>
  </div>
</header>
