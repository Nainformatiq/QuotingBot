const { permissions } = require('../../config');


/**
 * @public
 * @param {object} currentPermissionsObj
 * @param {Array} requiredPermissionsArr
 * @returns {boolean}
 */

module.exports = (currentPermissionsObj, requiredPermissionsArr) => {
    if(!requiredPermissionsArr || requiredPermissionsArr.length == 0) return true;

    const currentPermsArr = currentPermissionsObj == null ? [] : Object.keys(currentPermissionsObj);

    if(permissions.exempt.some(perm => currentPermsArr.includes(perm))) return true;

    return requiredPermissionsArr.some(perm => currentPermsArr.includes(perm))
}