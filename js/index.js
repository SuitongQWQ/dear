let scene,camera,renderer,controls,render;
var qwq = document.getElementById("qwq");
var qvq = document.getElementById("click");

const init = () => {
	//Scene(场景)
	scene = new THREE.Scene;
	scene.background = new THREE.Color("#6f5431");
	//renderer(渲染器)
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild(renderer.domElement);

	//天空贴图

	//网格
/*	var grid2=new THREE.GridHelper(10000,100);
	scene.add(grid2);*/

	//相机
	const aspect = window.innerWidth / window.innerHeight;		//获取窗口的尺寸
	camera = new THREE.PerspectiveCamera(70,aspect,0.01,5000);		//(相机角度,相机成像长宽比,相机最低能见度,相机最高能见度)
	camera.rotation.y = (90/180) * Math.PT;		//摄像机角度
	camera.position.set(173,88,164);		//摄像机位置
	camera.lookAt(0,40,0);
	render = function (){
		renderer.render( scene, camera )
	}

	//控制器(控制旋转)
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.addEventListener('change', render);
	controls.update();
	controls.target=new THREE.Vector3(0,40,0);
	function animate() {
		requestAnimationFrame( animate );
		controls.autoRotate=true;	//是否自动旋转
		controls.update();
		renderer.render( scene, camera );
	}
	animate();

	//环境光
	ambientLight = new THREE.AmbientLight("#ffffff");
	ambientLight.position.set(200,220,200);
	scene.add(ambientLight);

	//点光源
	var point = new THREE.PointLight("#ffffff");
	point.position.set(200,200,300);
	scene.add(point);

	//loader(导入建模)
	const loader = new THREE.GLTFLoader();
	loader.load("./moding/scene.glb",(result) => {
		scene.add(result.scene);
		renderer.render(scene,camera);
		console.log("qwq");
	});
	
	renderer.render(scene,camera);
	
}
init();

