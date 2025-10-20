import { AfterViewInit, Component, ElementRef, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'stats.js';

@Component({
  selector: 'app-viewer3d',
  standalone: true,
  templateUrl: './viewer3d.component.html',
  styleUrls: ['./viewer3d.component.scss']
})
export class Viewer3dComponent implements AfterViewInit, OnChanges {
  @ViewChild('canvasContainer', { static: true }) canvasRef!: ElementRef;

  @Input() shape: string = 'kugel';
  @Input() parameters: any;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private mesh?: THREE.LineSegments | THREE.Mesh;
  private controls!: OrbitControls;

  private stats!: Stats;
  private lastInfoLog = 0;

  ngAfterViewInit(): void {
    this.initScene();
    this.animate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.scene && changes['parameters'] && !changes['parameters'].firstChange) {
      this.addShape();
    }
  }

  private initScene(): void {
    const container = this.canvasRef.nativeElement as HTMLElement;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Make container a positioning context for stats overlay
    container.style.position = container.style.position || 'relative';

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.set(2, 2, 5);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000);
    container.innerHTML = ''; // clean
    container.appendChild(this.renderer.domElement);

    // --- stats.js: overlay inside container ---
    this.stats = new Stats();
    this.stats.showPanel(0); // 0 = FPS
    // style the DOM node so it is visible above the canvas
    Object.assign(this.stats.dom.style, {
      position: 'absolute',
      top: '6px',
      left: '6px',
      zIndex: '9999',
      pointerEvents: 'none' // clicks fall through to canvas
    });
    container.appendChild(this.stats.dom);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    const pointLight = new THREE.PointLight(0xffffff, 0.9);
    pointLight.position.set(5, 5, 5);
    this.scene.add(ambientLight, pointLight);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;

    this.addShape();

    // Handle resize
    new ResizeObserver(() => this.onResize()).observe(container);
  }

  private onResize(): void {
    const container = this.canvasRef.nativeElement as HTMLElement;
    const w = container.clientWidth || 400;
    const h = container.clientHeight || 400;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  private addShape(): void {
    // remove previous
    if (this.mesh) {
      this.scene.remove(this.mesh);
      this.mesh.geometry.dispose();
      if ((this.mesh.material as THREE.Material).dispose) {
        (this.mesh.material as THREE.Material).dispose();
      }
      this.mesh = undefined;
    }

    let geometry: THREE.BufferGeometry | null = null;
    let material: THREE.Material = new THREE.LineBasicMaterial({ color: 0x00ffcc, transparent: true, opacity: 0.6 });

    if (this.shape === 'kugel' && this.parameters?.radius) {
      geometry = new THREE.SphereGeometry(this.parameters.radius, 32, 32);
      // wireframe as LineSegments
      const wire = new THREE.WireframeGeometry(geometry);
      this.mesh = new THREE.LineSegments(wire, material);
    } else if (this.shape === 'quader' && this.parameters?.a && this.parameters?.b && this.parameters?.c) {
      geometry = new THREE.BoxGeometry(this.parameters.a, this.parameters.b, this.parameters.c);
      const wire = new THREE.WireframeGeometry(geometry);
      this.mesh = new THREE.LineSegments(wire, material);
    } else if (this.shape === 'kegel' && this.parameters?.radius && this.parameters?.hoehe) {
      geometry = new THREE.ConeGeometry(this.parameters.radius, this.parameters.hoehe, 32, 1, true); // openEnded = true
      const wire = new THREE.WireframeGeometry(geometry);
      this.mesh = new THREE.LineSegments(wire, material);
    } else {
      // fallback placeholder
      geometry = new THREE.BoxGeometry(1, 1, 1);
      const wire = new THREE.WireframeGeometry(geometry);
      this.mesh = new THREE.LineSegments(wire, material);
    }

    if (this.mesh) {
      this.scene.add(this.mesh);
    }
  }

  private animate = () => {
    requestAnimationFrame(this.animate);

    this.stats?.begin();

    if (this.mesh) {
      this.mesh.rotation.y += 0.01;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);

    this.stats?.end();

    const now = performance.now();
    if (now - this.lastInfoLog > 2000) {
      console.log('renderer.info', this.renderer.info);
      this.lastInfoLog = now;
    }
  };

  // Entferne Ressourcen beim Zerstören der Komponente
  ngOnDestroy(): void {
    // stop animation loop by clearing callback (optional)
    // remove stats DOM
    try {
      this.stats?.dom?.remove();
    } catch (e) {}
    // dispose renderer resources
    try {
      this.renderer?.dispose();
    } catch (e) {}
  }
}
