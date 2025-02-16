var context = $evaluation.getContext();
var identity = context.getIdentity();
var userId = identity.getId();

var realm = $evaluation.getRealm();
var userGroups = realm.getUserGroups(userId);

var permission = $evaluation.getPermission();
var resource = permission.getResource();
var ownerAttribute = resource.getAttribute("ownerId");
var ownerId = !ownerAttribute ? null : ownerAttribute[0];

if (!ownerId) {
    $evaluation.deny();
} else {
    var ownerGroups = realm.getUserGroups(ownerId);
    for (var i = 0; i < userGroups.length; i++) {
        for (var j = 0; j < ownerGroups.length; j++) {
            if (userGroups[i] === ownerGroups[j]) {
                $evaluation.grant();
            }
        }
    }
}