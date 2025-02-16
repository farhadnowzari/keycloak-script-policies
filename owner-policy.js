var context = $evaluation.getContext();
var identity = context.getIdentity();
var userId = identity.getId();
var permission = $evaluation.getPermission();
var resource = permission.getResource();
var ownerAttribute = resource.getAttribute("ownerId");
var ownerId = !ownerAttribute ? null : ownerAttribute[0];

if(ownerId === userId) {
    $evaluation.grant();
}
