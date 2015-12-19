3D object viewer
================

```sh
bower install https://github.com/ruslanas/obj-viewer.git
```

```javascript
var app = angular.module('app', ['ObjViewer']);
```

```html
<html>
	<head>
		<!-- ... -->
		<script src="three.js"></script>	
		<script src="OBJLoader.js"></script>	
		<script src="OrbitControls.js"></script>	
	</head>
	<body>
		<obj-viewer src="object.obj"
					lightmap="lightmap.png"
					width="400"
					height="300"></obj-viewer>
	</body>
</html>
```