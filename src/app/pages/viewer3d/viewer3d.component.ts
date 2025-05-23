import { AfterViewInit, Component, ElementRef, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
  private cube!: THREE.LineSegments;
  private controls!: OrbitControls;

  ngAfterViewInit(): void {
    this.initScene();
    this.animate();
    // ❌ this.addShape();  // ← entfernt
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.scene && changes['parameters']) {
      this.addShape();
    }
  }

  private initScene(): void {
    const width = this.canvasRef.nativeElement.clientWidth;
    const height = this.canvasRef.nativeElement.clientHeight;

    // Szene & Kamera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.set(2, 2, 5);
    this.camera.lookAt(0, 0, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000); // Hintergrund schwarz
    this.canvasRef.nativeElement.appendChild(this.renderer.domElement);

    // Licht: Ambient + Punktlicht
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Grundhelligkeit
    const pointLight = new THREE.PointLight(0xffffff, 0.9);
    pointLight.position.set(5, 5, 5);

    this.scene.add(ambientLight, pointLight);

    // OrbitControls für Interaktion
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;

    // Test: Szene initial anzeigen (falls Form schon gesetzt ist)
    this.addShape();
  }

  private addShape(): void {
    if (this.cube) {
      this.scene.remove(this.cube);
    }

    let geometry: THREE.BufferGeometry | null = null;

    if (this.shape === 'kugel' && this.parameters?.radius) {
      geometry = new THREE.SphereGeometry(this.parameters.radius, 32, 32);
    } else if (this.shape === 'quader' && this.parameters?.a && this.parameters?.b && this.parameters?.c) {
      geometry = new THREE.BoxGeometry(this.parameters.a, this.parameters.b, this.parameters.c);
    } else if (this.shape === 'kegel' && this.parameters?.radius && this.parameters?.hoehe) {
      geometry = new THREE.ConeGeometry(this.parameters.radius, this.parameters.hoehe, 32);
    }

    if (!geometry) return; // ⛔ Wenn keine gültige Geometrie vorhanden ist, NICHTS machen

    const wireframe = new THREE.WireframeGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffcc,
      transparent: true,
      opacity: 0.5
    });
    this.cube = new THREE.LineSegments(wireframe, lineMaterial);
    this.scene.add(this.cube);
  }

  private animate = () => {
    requestAnimationFrame(this.animate);

    // ✅ Nur wenn eine Geometrie existiert, rotieren
    if (this.cube) {
      this.cube.rotation.y += 0.001;
    }

    this.renderer.render(this.scene, this.camera);
  };
}
