function ObjectController(obj, options) {
    this._constructor(obj, options);
}

ObjectController.prototype._constructor = function (obj, options) {
    this._obj = obj;
    this._rotation_speed = options && options.rotation_speed || 10.0;
    this._move_speed = options && options.move_speed || 10.0;

}

ObjectController.prototype.move = function (v) {
    obj.move(v);
}

ObjectController.prototype.rotate = function (angle_in_deg, axis) {
    obj.rotate(angle_in_deg, axis);
}

//ObjectController.prototype.onMouseEvent = function(e){
//    if(e.eventType == "mousewheel"){
//        this.handleMouseWheel(e);
//    } else if (e.eventType == "mousemove"){
//        this.handleMouseMove(e);
//    }
//}


function CameraController(obj, options) {
    this._constructor(obj, options);
    this._delta_threshold = 1.0;
}
extendClass(CameraController, ObjectController);

CameraController.prototype.orbit = function (angle_in_deg, axis, center) {
    this._obj.orbit(angle_in_deg, axis, center);
}

CameraController.prototype.orbitDistanceFactor = function (f, center) {
    this._obj.orbit(f, center);
}

CameraController.prototype.handleMouseWheel = function (e) {
    this._obj.orbitDistanceFactor(1 + e.wheelDelta * App.dt * this._move_speed * -0.05 * 0.1);
}

CameraController.prototype.handleMouseMove = function (e) {
    if (e.dragging) {
        var delta = e.deltax > this._delta_threshold || e.deltax < -this._delta_threshold ? e.deltax: 0;
        this._obj.orbit( App.dt * delta * this._rotation_speed, [0, -1, 0], [0, 0, 0]);
        this._obj.updateMatrices();
        delta = e.deltay > this._delta_threshold || e.deltay < -this._delta_threshold ? e.deltay: 0;
        var right = this._obj.getLocalVector([-1, 0, 0]);
        this._obj.orbit( App.dt * delta * this._rotation_speed, right, [0, 0, 0]);
    }
}
CameraController.prototype.handleMouseDown = function (e) {
    console.log(e);
}

function NodeController(obj, options) {
    this._constructor(obj, options);
    this._node_temp = new RD.SceneNode();
    this._node_temp.id = "bounding";
    this._node_temp.mesh = "bounding";
    this._node_temp.primitive = gl.LINES;
    this._node_temp.color = [0.3, 0.7, 0.56];
}
extendClass(NodeController, ObjectController);


NodeController.prototype.handleMouseWheel = function (e) {
}

NodeController.prototype.handleMouseMove = function (e) {

}

NodeController.prototype.handleMouseDown = function (e) {
    if(this._obj)
        this.removeBounding();
    this._obj = e.obj;
    this.createBounding();

    this._obj.color = [Math.random(), Math.random(), Math.random()];

}

NodeController.prototype.createBounding = function () {
    console.log(gl);
    this._node_temp.scale = this._obj._scale;
    this._obj.addChild(this._node_temp);
}

NodeController.prototype.removeBounding = function () {
    this._obj.removeChild(this._node_temp);
}