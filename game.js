const BLOCK_TYPES = {
    air: { id: 0, name: 'Air', solid: false, breakTime: 0 },
    grass: { id: 1, name: 'Grass Block', solid: true, breakTime: 900, hardness: 0.6 },
    dirt: { id: 2, name: 'Dirt', solid: true, breakTime: 750, hardness: 0.5 },
    oak_log: { id: 3, name: 'Oak Log', solid: true, breakTime: 3000, hardness: 2.0 },
    oak_leaves: { id: 4, name: 'Oak Leaves', solid: true, breakTime: 350, hardness: 0.2 }
};

const TEXTURES = {
    dirt: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEV5VTq5hVyHh4eWbEpsbGx0WERZPSk6VlZqAAAAa0lEQVR42gXBwQnDQAxFwSd+0FnLgs8+5SyjsA2kgZQgY9j+S8gMM61oM9R6W85NeBDs4BPLSpbk9bBeary02zGC02JIMIpVFCm5kkbtDUPIYt5HnaQuffNxPCuAgfiVH1bk7T5EkTPPovwPGbIOYwnMHcMAAAAASUVORK5CYII=',
    grass_top: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAvVBMVEVlmjdWgi5hkzRCZCNXhC8+XyJmmjdBYyNbiTFQeixTfS1iljVHbCZfkDNaiTFUfy1gkjRKcShFaSVbijFSfSxcizJHbSdEaCVMcylQeStGaiZNdSpJbyhReyxCZCRDZiRZiDBYhjBFaSZIbSdVgS5EZyVMdClJbidDZSROdipPeCtLcilOdypLcShnnThZhzBKcChGayZAYSNPeStWgy9cjDJXhS9UgC5Tfi1YhTBAYCI+XiFBYiM/YCI7WiCvmW5WAAAA5ElEQVR42gXBBYLCMBAAwL3DoS6RJrWklrpR5OT/z2IG2l5pGoltc+GoTP87qO2MhnnoxMlL9TYaYe2ioJRF0T4GH/3lFhwmTlkYsVh0lIxpBF/CF+5durefPD1XsoPw8n7hpfZQLcVbNi1U161ggscBslyWUgIEPcditw+ojzDJ4gRSzzJc7F91w2GTMiugzndnX4wcMZY0OsHgmXRzrEYd51QQSQkEvrbSgJWU2Sc9jjjcKOYhm34549Fjmyng4cCiEPeZGrxMDndYs+NJP7eqqmuUPMcZpkWW+0urGtglQSHND4s8Hp451oHHAAAAAElFTkSuQmCC',
    grass_side: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAeFBMVEV5VTqWbEq5hVyHh4dwsEZoqD5iojhsrEJhoTdpqT9npz1goDZXly1QkCZzs0l2tkyKuVp+vlRqqkCDslOBsFFmpjyQv2CSwWKTwmN/v1WXxmdvr0VkpDqcy2xrq0GNvF11tUttrUN0tEpfnzVxsUd0WERsbGxZPSmGrpghAAAAjElEQVR42gXBB0LCAAAEwd2LGkAFG3ZqIPf/HzLDebPebv+m8XXztlounk8cx5eP994/TN+f68W42nPo7n/Zu55/vn779Fg6t5e2U0+lBTEV2s5YoIptoUAIMEBCgggkClZBEUSKAgUstAAkCJIQm1QHEDQ4K5VCRQMAJCBcUZoSRRpKEwRFogwoKL0BxA0LD3lN79UAAAAASUVORK5CYII=',
    oak_log: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEV0WjaYeEmRcUJfSitMPSY4Kxi/mP6UAAAAaElEQVR42gXBwQ3DIBREwSd2/90SKWAl8B0lDRAqcPpvJjM4lWpHuFevtkV9qttb3LJUezBV6nLInu7TYe2xEof15M1Q8I+3xgh8WZp5oKnkPLiprro2L8bdi8W142Egh9s+kLOnOfoDKZ4L2kN8RTwAAAAASUVORK5CYII=',
    oak_log_top: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAG1BMVEVfSivCnWK4lF+vj1WfhE2WdEF+Yjd0WjZMPSZxHR9aAAAAbklEQVR42gXBgXHDQAwDMFD21dp/3CZ+BmA9lmdZZP+R5oziL+ZWTRHf3vgIUq70liYg2phtmUlmiI1rjuvFHPOeoVWJamMAIoRZoEeFjWvejLTa6XtTDiA1W6pte7AxkwbgPTFE44xyWCzPsg8/vNE4rPRQOg0AAAAASUVORK5CYII=',
    oak_leaves: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IB2cksfwAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+oEFQY4Lb+BDxUAAAG0SURBVDjLdVMhb8JAGH3XzGAQpShS3AxU1JIlJOjaZrKCOv7E5X4EuCIql1kyuaTJgl2WDjNHM0WpwCC/qXc5SFbX7753733ve6dSEwsAvOpPVbSZ5EGpdJUIAJj5Ti03MwGAy+mK6WIEM98pACjaTD5efuBNFyO86k8FAHlQqtTE8v3+i6buoKtEtqu9CiMf/WEP/Io2k+PhjKfnRygWybRd7a2Cpu7w9PwIqnLZifMAgIDL6YrUxGLmOzWeDBBGPgDYGkF5UFrFD7pKpKk7hJGPpu6wXe0VABwPZ4wnA9vMi6aL0c0lN3IJpkGX09XOTZ9SE0t/2EMY+TDznfKaurPg1MTiGkSD+8Oe9Wi6GFm1RZuJ585OlvFkAK4xNbFQCY3k+fFwhucypSaWt/WXPdRVIlRAVl0lkgel4r9HJnfOt/UX7rMAwG6FKu2/rhKhmUwma8vNTLh39riBUveOU4WbOK5zuZkJ3WePLXIU9x3wEkYcAPrDnk1n0WaidJUIGf5Tww2x9+PlB2HkYzwZwHPB9/vnG+FDoiqC86BU3vFwvnHWbWQGLqerDVIelIpgXSXyB1KZR3wq11xHAAAAAElFTkSuQmCC'
};

const BREAKING_TEXTURES = [
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAALUlEQVR42mP4//8/IyWYYdSAwW6Ara3tf4oMmD179n9ChhD0AsiQ0Wgc7AYAAOqH+zNQ3r9kAAAAAElFTkSuQmCC',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAOklEQVR42mP4//8/IyWYYdQA3AbY2tr+H1gDZs+e/R9mCD7D8IYBzBAQTXYgEvIKQQPw2T6aEqlkAADEA/W3ycLXvwAAAABJRU5ErkJggg==',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQklEQVR42mP4//8/IyWYYRgbYGtr+39wGQDiYzMUpwGzZ8+GawDRID4IkxSIMEOwaSQ6FgiFBW0NIOR8osJgBOQFALo37sVTOo/LAAAAAElFTkSuQmCC',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWElEQVR42mP4//8/IyWYYXAbYGtr+59sA0CaZ8+eTZkBhNg4DQApQlYIcglMDN1VWA0AKYJpQvYONi/hDUSYIfjCgmA0EooJ2hmAK9CINgBXoA2xvEAMBgBGPud3dYZtOQAAAABJRU5ErkJggg==',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYklEQVR42r1TQQrAMAxyD8tL89iMHgQJoQxHewi0UsWYFFX1/CkcF4iIsgUWOTM9ASV3F3rHF+v9rK4wEVnEFoFYbwmTbRZFFN9m0B9QZBfk2THaAhqktQdTkHYL9iZe+40vs7nda+BuVOMAAAAASUVORK5CYII=',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAcElEQVR42rWTWwpAIQhEbWGu1MUaXRgQcXpyP8SIPI1jibu3l5DfAKrqyFgfAczsKxx5xJUCFGYFUZXMpOe9CAa8BOS+0U5UVbYQ6Siqbi0BFT0auTSRHZqNkE6BGXgEYKYtAczIbQAz8ukzXT3l3egz49IXvXQCVAAAAABJRU5ErkJggg==',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAeklEQVR42qWTSwrAQAhD7cE8qYe1uBCCRLF1MYjzeZrgiLs/lyVsU1X9BDAzT0jECSjdQUIixloDsHI+rB1gVyOAeVK7ooCqO+VgV1QC0quRmFMAo6ORmY+AzrDVHGCVatrnOUAjf80BM3IFmIzspEi93I11J0Wu3/kFAq7Fe6kxH0EAAAAASUVORK5CYII=',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhUlEQVR42qWTSRKAMAgE8WF5KY/FygEL2yEp9cAhCz0wJBYRx58wbowxYsZngLvHjITsgNYpJySBrPIBUMqZSHhdSw+oQlgVa01U7VRQ7huTk67aUWZaVyaNZFsSQBCTVBW3KahLyo/lQ6KR1Y+2BTUyGqke1AXoxsSzpYlU3FW0/Exv1ie0hq53Bf15aAAAAABJRU5ErkJggg==',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmklEQVR42o2SYQ6FMAiDeQfbSXdYXjSpqd869QeZQiilpbr7l2KM0cc75+xUV77YpGCjAPUqitMU3uCAXrsAlPSCcgJMbG4M0mQ1Etz/i0KlXQnmwyqpv1uH4h7fiws7ISneTYNEk0ImCxcAArGJrE4AXhypPtl7AqTdeJG8k3gHb0L6QfmK9WQTa59cSFdHRssKFHHngteV/wPDepaHIu0QVAAAAABJRU5ErkJggg==',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAoUlEQVR42n2Tyw3AIAxD3cGYlGFTUSmV+2o4IEEAf2JQVV1rjDGq576ec5avWVdfWIW12aMPEJBEImoPv+CAvvcCODsVNWBS8wA4A5ndv1/ytciQvBLMyeTSHD3ZYXPXXH7Y0ZMdJvCxQJls5O6tKHlPPWGEfU58WZR6ive1kKSleFNC2kXGRnrcDqhTTOmPeP3pAZnTq6Oin4X0oXbfnNZu626Io6lqGCwAAAAASUVORK5CYII='
];

class VoxelWorld {
    constructor(size) {
        this.size = size;
        this.chunks = new Map();
        this.blocks = new Map();
        this.generate();
    }

    getKey(x, y, z) {
        return `${x},${y},${z}`;
    }

    getBlock(x, y, z) {
        return this.blocks.get(this.getKey(x, y, z)) || 'air';
    }

    setBlock(x, y, z, type) {
        if (type) {
            this.blocks.set(this.getKey(x, y, z), type);
        } else {
            this.blocks.delete(this.getKey(x, y, z));
        }
    }

    isSolid(x, y, z) {
        const type = this.getBlock(x, y, z);
        return BLOCK_TYPES[type]?.solid || false;
    }

    generate() {
        const ground = 0;

        for (let x = -20; x <= 20; x++) {
            for (let z = -20; z <= 20; z++) {
                this.setBlock(x, ground, z, 'grass');
                for (let y = ground - 1; y >= -5; y--) {
                    this.setBlock(x, y, z, 'dirt');
                }
            }
        }

        for (let i = 0; i < 15; i++) {
            const tx = Math.floor(Math.random() * 30) - 15;
            const tz = Math.floor(Math.random() * 30) - 15;
            this.generateTree(tx, ground + 1, tz);
        }
    }

    generateTree(x, y, z) {
        const height = 4 + Math.floor(Math.random() * 2);
        for (let i = 0; i < height; i++) {
            this.setBlock(x, y + i, z, 'oak_log');
        }
        for (let lx = x - 2; lx <= x + 2; lx++) {
            for (let ly = y + height - 2; ly <= y + height; ly++) {
                for (let lz = z - 2; lz <= z + 2; lz++) {
                    if (lx === x && lz === z && ly < y + height) continue;
                    if (Math.abs(lx - x) + Math.abs(lz - z) + Math.abs(ly - (y + height - 1)) <= 3) {
                        if (this.getBlock(lx, ly, lz) === 'air') {
                            this.setBlock(lx, ly, lz, 'oak_leaves');
                        }
                    }
                }
            }
        }
    }
}

class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB);
        this.scene.fog = new THREE.Fog(0x87CEEB, 10, 60);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 10, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: false });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(1);
        document.getElementById('game-container').appendChild(this.renderer.domElement);

        this.world = new VoxelWorld(64);
        this.materials = new Map();
        this.breakingStages = [];
        this.breakingBlock = null;
        this.breakingStartTime = 0;
        this.breakingMesh = null;

        this.keys = {};
        this.mouse = { x: 0, y: 0, locked: false, leftDown: false };
        this.mode = 'break'; // 'break' or 'place'
        this.velocity = new THREE.Vector3();
        this.onGround = false;
        this.selectedSlot = 0;
        this.inventory = ['grass', 'dirt', 'oak_log', 'oak_leaves', null, null, null, null, null];

        this.playerHeight = 1.8;
        this.eyeHeight = 1.6;
        this.playerWidth = 0.6;

        this.lastChunkX = 0;
        this.lastChunkZ = 0;
        this.speed = 4.3;
        this.jumpStrength = 9;

        this.yaw = 0;
        this.pitch = 0;

        this.raycaster = new THREE.Raycaster();
        this.highlightBox = null;

        this.init();
    }

    async init() {
        await this.loadTextures();
        this.buildWorld();
        this.addLights();
        this.setupInput();
        this.createHighlightBox();
        this.updateCameraRotation();
        this.animate();
    }

    loadTextures() {
        const loader = new THREE.TextureLoader();

        const loadFromBase64 = (name, data) => new Promise((resolve) => {
            loader.load(data, (tex) => {
                tex.magFilter = THREE.NearestFilter;
                tex.minFilter = THREE.NearestFilter;
                tex.colorSpace = THREE.SRGBColorSpace;
                this.materials.set(name, new THREE.MeshLambertMaterial({ map: tex }));
                resolve();
            }, undefined, () => {
                this.materials.set(name, new THREE.MeshLambertMaterial({ color: this.getDefaultColor(name) }));
                resolve();
            });
        });

        const promises = [
            loadFromBase64('grass_top', TEXTURES.grass_top),
            loadFromBase64('grass_side', TEXTURES.grass_side),
            loadFromBase64('dirt', TEXTURES.dirt),
            loadFromBase64('oak_log_side', TEXTURES.oak_log),
            loadFromBase64('oak_log_top', TEXTURES.oak_log_top),
            loadFromBase64('oak_leaves', TEXTURES.oak_leaves)
        ];

        for (let i = 0; i < BREAKING_TEXTURES.length; i++) {
            promises.push(new Promise((resolve) => {
                loader.load(BREAKING_TEXTURES[i], (tex) => {
                    tex.magFilter = THREE.NearestFilter;
                    tex.minFilter = THREE.NearestFilter;
                    this.breakingStages.push(tex);
                    resolve();
                }, undefined, () => resolve());
            }));
        }

        return Promise.all(promises);
    }

    getDefaultColor(name) {
        const colors = { grass: 0x567d46, dirt: 0x8b7355, oak_log: 0x8b6914, oak_leaves: 0x2d5a2d };
        return colors[name] || 0x888888;
    }

    getBlockMaterial(type) {
        const mat = this.materials.get(type);
        if (mat) return mat;

        if (type === 'grass') {
            const side = this.materials.get('grass_side');
            const top = this.materials.get('grass_top');
            const dirt = this.materials.get('dirt');
            if (side && top && dirt) {
                return [side, side, top, dirt, side, side];
            }
            return new THREE.MeshLambertMaterial({ color: 0x567d46 });
        }

        if (type === 'oak_log') {
            const side = this.materials.get('oak_log_side');
            const top = this.materials.get('oak_log_top');
            if (side && top) {
                return [side, side, top, top, side, side];
            }
            return new THREE.MeshLambertMaterial({ color: 0x8b6914 });
        }

        return new THREE.MeshLambertMaterial({ color: this.getDefaultColor(type) || 0xff00ff });
    }

    buildWorld() {
        if (this.worldMesh) this.scene.remove(this.worldMesh);

        // Only render blocks within render distance
        const renderDist = 16;
        const cx = Math.floor(this.camera.position.x);
        const cy = Math.floor(this.camera.position.y);
        const cz = Math.floor(this.camera.position.z);

        const simpleInstances = new Map();
        const multiTextures = [];
        const dummy = new THREE.Object3D();

        for (const [key, type] of this.world.blocks) {
            const [x, y, z] = key.split(',').map(Number);

            // Skip blocks too far away
            if (Math.abs(x - cx) > renderDist ||
                Math.abs(y - cy) > renderDist ||
                Math.abs(z - cz) > renderDist) continue;

            const mat = this.getBlockMaterial(type);
            if (Array.isArray(mat)) {
                multiTextures.push({ x, y, z, type, mat });
            } else {
                if (!simpleInstances.has(type)) simpleInstances.set(type, []);
                simpleInstances.get(type).push({ x, y, z });
            }
        }

        const group = new THREE.Group();

        // Single-texture blocks with InstancedMesh
        for (const [type, positions] of simpleInstances) {
            const geo = new THREE.BoxGeometry(1, 1, 1);
            const mat = this.getBlockMaterial(type);
            const mesh = new THREE.InstancedMesh(geo, mat, positions.length);

            positions.forEach((pos, i) => {
                dummy.position.set(pos.x, pos.y, pos.z);
                dummy.updateMatrix();
                mesh.setMatrixAt(i, dummy.matrix);
            });

            mesh.castShadow = false;
            mesh.receiveShadow = false;
            group.add(mesh);
        }

        // Multi-texture blocks
        for (const block of multiTextures) {
            const geo = new THREE.BoxGeometry(1, 1, 1);
            const mesh = new THREE.Mesh(geo, block.mat);
            mesh.position.set(block.x, block.y, block.z);
            mesh.castShadow = false;
            mesh.receiveShadow = false;
            group.add(mesh);
        }

        this.worldMesh = group;
        this.scene.add(group);
    }

    addLights() {
        const ambient = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambient);

        const dir = new THREE.DirectionalLight(0xffffff, 0.4);
        dir.position.set(50, 100, 50);
        this.scene.add(dir);
    }

    createHighlightBox() {
        const geo = new THREE.BoxGeometry(1.002, 1.002, 1.002);
        const edges = new THREE.EdgesGeometry(geo);
        const mat = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
        this.highlightBox = new THREE.LineSegments(edges, mat);
        this.highlightBox.visible = false;
        this.scene.add(this.highlightBox);
    }

    setupInput() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            if (e.code === 'Space') e.preventDefault();
            if (e.code >= 'Digit1' && e.code <= 'Digit9') {
                this.selectedSlot = parseInt(e.code.slice(-1)) - 1;
                this.updateHotbar();
            }
            if (e.code === 'KeyE') {
                this.mode = this.mode === 'break' ? 'place' : 'break';
                this.updateModeUI();
            }
        });

        document.addEventListener('keyup', (e) => this.keys[e.code] = false);

        const canvas = this.renderer.domElement;

        canvas.addEventListener('mousedown', (e) => {
            if (!this.mouse.locked) {
                canvas.requestPointerLock();
            } else {
                if (e.button === 0) {
                    if (this.mode === 'break') {
                        this.mouse.leftDown = true;
                        this.startBreaking();
                    } else {
                        this.placeBlock();
                    }
                }
            }
        });

        document.addEventListener('mouseup', (e) => {
            if (e.button === 0) {
                this.mouse.leftDown = false;
                this.stopBreaking();
            }
        });

        document.addEventListener('pointerlockchange', () => {
            this.mouse.locked = document.pointerLockElement === canvas;
            document.getElementById('instructions').style.display = this.mouse.locked ? 'none' : 'block';
        });

        document.addEventListener('mousemove', (e) => {
            if (this.mouse.locked) {
                this.yaw -= e.movementX * 0.002;
                this.pitch -= e.movementY * 0.002;
                this.pitch = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, this.pitch));
                this.updateCameraRotation();
            }
        });

        document.getElementById('instructions').addEventListener('click', () => {
            canvas.requestPointerLock();
        });

        document.querySelectorAll('.slot').forEach((slot, i) => {
            slot.addEventListener('click', () => {
                this.selectedSlot = i;
                this.updateHotbar();
            });
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        this.updateHotbar();
    }

    updateCameraRotation() {
        const cosPitch = Math.cos(this.pitch);
        const sinPitch = Math.sin(this.pitch);
        const cosYaw = Math.cos(this.yaw);
        const sinYaw = Math.sin(this.yaw);

        const forward = new THREE.Vector3(
            -sinYaw * cosPitch,
            sinPitch,
            -cosYaw * cosPitch
        );

        const up = new THREE.Vector3(
            sinYaw * sinPitch,
            cosPitch,
            cosYaw * sinPitch
        );

        this.camera.lookAt(this.camera.position.clone().add(forward));
    }

    updateHotbar() {
        document.querySelectorAll('.slot').forEach((slot, i) => {
            slot.classList.toggle('active', i === this.selectedSlot);
        });
    }

    updateModeUI() {
        const modeEl = document.getElementById('mode-indicator');
        if (modeEl) {
            modeEl.textContent = this.mode === 'break' ? 'BREAK' : 'PLACE';
            modeEl.style.color = this.mode === 'break' ? '#ff5555' : '#55ff55';
        }
    }

    getTargetBlock() {
        const cosPitch = Math.cos(this.pitch);
        const sinPitch = Math.sin(this.pitch);
        const cosYaw = Math.cos(this.yaw);
        const sinYaw = Math.sin(this.yaw);

        const dir = new THREE.Vector3(
            -sinYaw * cosPitch,
            sinPitch,
            -cosYaw * cosPitch
        );

        this.raycaster.set(this.camera.position, dir);

        const intersects = [];
        const box = new THREE.Box3();

        const cx = Math.floor(this.camera.position.x);
        const cy = Math.floor(this.camera.position.y);
        const cz = Math.floor(this.camera.position.z);

        for (let x = -5; x <= 5; x++) {
            for (let y = -5; y <= 5; y++) {
                for (let z = -5; z <= 5; z++) {
                    const wx = cx + x;
                    const wy = cy + y;
                    const wz = cz + z;

                    if (this.world.isSolid(wx, wy, wz)) {
                        box.min.set(wx - 0.5, wy - 0.5, wz - 0.5);
                        box.max.set(wx + 0.5, wy + 0.5, wz + 0.5);
                        if (this.raycaster.ray.intersectsBox(box)) {
                            const dist = Math.sqrt((wx - cx) ** 2 + (wy - cy) ** 2 + (wz - cz) ** 2);
                            if (dist <= 5) {
                                intersects.push({ x: wx, y: wy, z: wz, distance: dist });
                            }
                        }
                    }
                }
            }
        }

        intersects.sort((a, b) => a.distance - b.distance);
        if (intersects[0]) {
            intersects[0].type = this.world.getBlock(intersects[0].x, intersects[0].y, intersects[0].z);
        }
        return intersects[0] || null;
    }

    startBreaking() {
        const target = this.getTargetBlock();
        if (!target) return;

        const type = this.world.getBlock(target.x, target.y, target.z);
        if (type === 'air') return;

        if (this.breakingBlock) this.stopBreaking();

        this.breakingBlock = { x: target.x, y: target.y, z: target.z, type };
        this.breakingStartTime = performance.now();
        this.breakingBlock.breakTime = BLOCK_TYPES[type]?.breakTime || 1000;
        this.breakingBlock.animating = false;
    }

    animateHand() {
        const hand = document.getElementById('steve-hand');
        hand.classList.add('breaking');
        setTimeout(() => hand.classList.remove('breaking'), 100);
    }

    stopBreaking() {
        this.breakingBlock = null;
        if (this.breakingMesh) {
            this.scene.remove(this.breakingMesh);
            this.breakingMesh = null;
        }
    }

    updateBreaking() {
        if (!this.mouse.leftDown || !this.breakingBlock) {
            if (!this.mouse.leftDown) this.stopBreaking();
            return;
        }

        const target = this.getTargetBlock();
        if (!target ||
            target.x !== this.breakingBlock.x ||
            target.y !== this.breakingBlock.y ||
            target.z !== this.breakingBlock.z) {
            this.stopBreaking();
            return;
        }

        const elapsed = performance.now() - this.breakingStartTime;
        const progress = Math.min(1, elapsed / this.breakingBlock.breakTime);

        if (progress < 1 && !this.breakingBlock.animating) {
            this.animateHand();
            this.breakingBlock.animating = true;
        }

        const stage = Math.floor(progress * 10);
        if (stage >= 10) {
            this.world.setBlock(this.breakingBlock.x, this.breakingBlock.y, this.breakingBlock.z, null);
            this.buildWorld();
            this.stopBreaking();
            return;
        }

        this.updateBreakingOverlay(stage, this.breakingBlock);

        if (progress < 1) {
            setTimeout(() => {
                if (this.mouse.leftDown && this.breakingBlock) this.animateHand();
            }, 250);
        }
    }

    updateBreakingOverlay(stage, block) {
        if (this.breakingMesh) {
            this.scene.remove(this.breakingMesh);
        }

        if (!this.breakingStages[stage]) return;

        const geo = new THREE.BoxGeometry(1.01, 1.01, 1.01);
        const mat = new THREE.MeshBasicMaterial({
            map: this.breakingStages[stage],
            transparent: true,
            opacity: 0.8,
            depthTest: true
        });
        this.breakingMesh = new THREE.Mesh(geo, mat);
        this.breakingMesh.position.set(block.x, block.y, block.z);
        this.scene.add(this.breakingMesh);
    }

    placeBlock() {
        const target = this.getTargetBlock();
        if (!target) return;

        const blockType = this.inventory[this.selectedSlot];
        if (!blockType) return;

        // Ray from camera
        const cosPitch = Math.cos(this.pitch);
        const sinPitch = Math.sin(this.pitch);
        const cosYaw = Math.cos(this.yaw);
        const sinYaw = Math.sin(this.yaw);

        const rayDir = new THREE.Vector3(
            -sinYaw * cosPitch,
            sinPitch,
            -cosYaw * cosPitch
        );

        // Calculate intersection point with box
        const box = new THREE.Box3(
            new THREE.Vector3(target.x - 0.5, target.y - 0.5, target.z - 0.5),
            new THREE.Vector3(target.x + 0.5, target.y + 0.5, target.z + 0.5)
        );

        const ray = new THREE.Ray(this.camera.position, rayDir);
        const intersection = new THREE.Vector3();
        ray.intersectBox(box, intersection);

        // Determine which face was hit
        const dx = intersection.x - target.x;
        const dy = intersection.y - target.y;
        const dz = intersection.z - target.z;

        let placeX = target.x;
        let placeY = target.y;
        let placeZ = target.z;

        // Find largest component to determine face
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > Math.abs(dz)) {
            placeX += dx > 0 ? 1 : -1;
        } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > Math.abs(dz)) {
            placeY += dy > 0 ? 1 : -1;
        } else {
            placeZ += dz > 0 ? 1 : -1;
        }

        const feetY = this.camera.position.y - this.eyeHeight;
        const headY = this.camera.position.y + 0.2;
        const playerBB = {
            minX: this.camera.position.x - this.playerWidth / 2,
            maxX: this.camera.position.x + this.playerWidth / 2,
            minY: feetY,
            maxY: headY,
            minZ: this.camera.position.z - this.playerWidth / 2,
            maxZ: this.camera.position.z + this.playerWidth / 2
        };

        const blockBB = {
            minX: placeX - 0.5, maxX: placeX + 0.5,
            minY: placeY - 0.5, maxY: placeY + 0.5,
            minZ: placeZ - 0.5, maxZ: placeZ + 0.5
        };

        if (this.aabbIntersect(playerBB, blockBB)) return;

        this.world.setBlock(placeX, placeY, placeZ, blockType);
        this.buildWorld();
    }

    aabbIntersect(a, b) {
        return a.minX < b.maxX && a.maxX > b.minX &&
               a.minY < b.maxY && a.maxY > b.minY &&
               a.minZ < b.maxZ && a.maxZ > b.minZ;
    }

    updatePhysics(dt) {
        this.velocity.y -= 30 * dt;

        const cosYaw = Math.cos(this.yaw);
        const sinYaw = Math.sin(this.yaw);

        let moveX = 0;
        let moveZ = 0;

        if (this.keys['KeyW']) { moveX -= sinYaw; moveZ -= cosYaw; }
        if (this.keys['KeyS']) { moveX += sinYaw; moveZ += cosYaw; }
        if (this.keys['KeyA']) { moveX -= cosYaw; moveZ += sinYaw; }
        if (this.keys['KeyD']) { moveX += cosYaw; moveZ -= sinYaw; }

        if (moveX !== 0 || moveZ !== 0) {
            const len = Math.sqrt(moveX * moveX + moveZ * moveZ);
            moveX /= len;
            moveZ /= len;
        }

        this.velocity.x = moveX * this.speed;
        this.velocity.z = moveZ * this.speed;

        const newX = this.camera.position.x + this.velocity.x * dt;
        const newZ = this.camera.position.z + this.velocity.z * dt;
        const newY = this.camera.position.y + this.velocity.y * dt;

        if (!this.checkCollision(newX, this.camera.position.y, this.camera.position.z)) {
            this.camera.position.x = newX;
        }
        if (!this.checkCollision(this.camera.position.x, this.camera.position.y, newZ)) {
            this.camera.position.z = newZ;
        }

        if (!this.checkCollision(this.camera.position.x, newY, this.camera.position.z)) {
            this.camera.position.y = newY;
            this.onGround = false;
        } else {
            if (this.velocity.y < 0) this.onGround = true;
            this.velocity.y = 0;
        }

        if (this.keys['Space'] && this.onGround) {
            this.velocity.y = this.jumpStrength;
            this.onGround = false;
        }
    }

    checkCollision(camX, camY, camZ) {
        const feetY = camY - this.eyeHeight;
        const headY = camY + 0.2;

        const pMinX = camX - this.playerWidth / 2;
        const pMaxX = camX + this.playerWidth / 2;
        const pMinY = feetY;
        const pMaxY = headY;
        const pMinZ = camZ - this.playerWidth / 2;
        const pMaxZ = camZ + this.playerWidth / 2;

        const minX = Math.floor(pMinX + 0.5);
        const maxX = Math.floor(pMaxX + 0.5);
        const minY = Math.floor(pMinY + 0.5);
        const maxY = Math.floor(pMaxY + 0.5);
        const minZ = Math.floor(pMinZ + 0.5);
        const maxZ = Math.floor(pMaxZ + 0.5);

        for (let ix = minX; ix <= maxX; ix++) {
            for (let iy = minY; iy <= maxY; iy++) {
                for (let iz = minZ; iz <= maxZ; iz++) {
                    if (this.world.isSolid(ix, iy, iz)) {
                        const bMinX = ix - 0.5, bMaxX = ix + 0.5;
                        const bMinY = iy - 0.5, bMaxY = iy + 0.5;
                        const bMinZ = iz - 0.5, bMaxZ = iz + 0.5;

                        if (pMaxX > bMinX && pMinX < bMaxX &&
                            pMaxY > bMinY && pMinY < bMaxY &&
                            pMaxZ > bMinZ && pMinZ < bMaxZ) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    updateHighlight() {
        const target = this.getTargetBlock();
        if (target) {
            this.highlightBox.position.set(target.x, target.y, target.z);
            this.highlightBox.visible = true;
            document.getElementById('block-name').textContent = BLOCK_TYPES[target.type]?.name || '';
        } else {
            this.highlightBox.visible = false;
            document.getElementById('block-name').textContent = '';
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const dt = 1/60;
        this.updatePhysics(dt);
        this.updateBreaking();
        this.updateHighlight();

        // Rebuild world when moving to new chunk
        const chunkX = Math.floor(this.camera.position.x / 8);
        const chunkZ = Math.floor(this.camera.position.z / 8);
        if (chunkX !== this.lastChunkX || chunkZ !== this.lastChunkZ) {
            this.lastChunkX = chunkX;
            this.lastChunkZ = chunkZ;
            this.buildWorld();
        }

        this.renderer.render(this.scene, this.camera);
    }
}

new Game();
