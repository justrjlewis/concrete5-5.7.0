<?
defined('C5_EXECUTE') or die(_("Access Denied."));
$canRead = false;
$ch = Page::getByID($_REQUEST['cID']);
$path = $ch->getCollectionPath();
if (strpos($path, '/dashboard') === 0) {
	$cp = new Permissions($ch);
	if ($cp->canRead()) {
		$canRead = true;
	}
}

if (!$canRead) {
	die(_("Access Denied."));
}

// this should be cleaned up.... yeah
$db = Loader::db();
// update order of collections
Loader::model('user_attributes');
$uats = $_REQUEST['akID_' . $_REQUEST['asID']];

if (is_array($uats)) {
	$as = AttributeSet::getByID($_REQUEST['asID']);
	$as->updateAttributesDisplayOrder($uats);
}