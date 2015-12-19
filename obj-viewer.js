(function(angular) {
	var module = angular.module('ObjViewer', []);
	module.directive('objViewer', function() {
		return {
			link: function(scope, element, attr) {
				var scene = new THREE.Scene();
				var renderer = new THREE.WebGLRenderer();
				var w = attr.width, h = attr.height;
				renderer.setSize(w, h);
				
				var ambient = new THREE.AmbientLight(0xFFFFFF);
				scene.add(ambient);

				var camera = new THREE.PerspectiveCamera(45, w/h, 0.1, 1000);
				scene.add(camera);
				camera.position.z = 15;
				camera.lookAt(scene.position);
				element.append(renderer.domElement);
				var manager = new THREE.LoadingManager();
				var loader = new THREE.OBJLoader(manager);
				
				var controls = new THREE.OrbitControls(camera, renderer.domElement);

				var tex = new THREE.Texture();
				var imgLoader = new THREE.ImageLoader(manager);
				imgLoader.load(attr.lightmap, function(image) {
					tex.image = image;
					tex.needsUpdate = true;
				});

				loader.load(attr.src, function(object) {
					object.traverse(function(child) {
						if(child instanceof THREE.Mesh) {
							child.material.map = tex;
						}
					});
					scene.add(object);
				}, function() {}, function(err) {console.log(err);});

				function render() {
					requestAnimationFrame(render);
					renderer.render(scene, camera);
				}
				render();
			}
		};
	});
}(angular));
