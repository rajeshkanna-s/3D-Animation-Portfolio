import { ProjectData } from '../types/portfolio';

export const projectsData: ProjectData[] = [
  {
    id: '01-gather',
    number: '01',
    title: 'Gather',
    tagline: 'Crafted individually. Made to gather.',
    industry: 'Culinary',
    discipline: 'Interactive 3D Art Direction & Gastronomy',
    year: '2025',
    accentColor: '#4F6D56', // Herb green
    shortStatement: 'A cinematic culinary choreography where bespoke table elements, ceramic stoneware, and raw farm ingredients assemble into a shared feast.',
    description: 'Gather explores the ritual of communal dining through progressive 3D motion. Ingredients enter along curved Bézier paths, landing into a sculpted dinner plate before expanding into an intimate dining landscape.',
    challenge: 'Translating the sensory richness, organic texture, and tactile warmth of fine dining into real-time WebGL without overwhelming mobile GPU capabilities.',
    approach: 'Engineered procedural Bézier trajectory controllers for each ingredient, paired with PBR ceramic glaze and walnut wood grain shaders.',
    artDirection: 'Warm studio candlelight, shallow depth-of-field, organic ceramics, crisp folded linen, and delicate heirloom botanicals.',
    motionSystem: 'Staggered ingredient flight (80–150ms intervals) with realistic rotational inertia, settling with subtle secondary bounce.',
    techImplementation: 'Three.js BufferGeometry with instanced herb leaves, custom roughness-metalness maps, and procedural camera arc controllers.',
    performanceNotes: 'Merged static dining table assets; dynamically instanced garnish particles; capped draw calls to under 24.',
    results: [
      'Featured on Awwwards Site of the Day (9.12/10)',
      '140% increase in average session duration for private dining inquiries',
      'Flawless 60 FPS performance across desktop and mobile devices'
    ],
    metrics: [
      { label: 'Avg. Session', value: '4m 12s' },
      { label: 'Interaction Rate', value: '88.4%' },
      { label: 'WebGL Draw Calls', value: '< 24' }
    ],
    tags: ['WebGL', 'Culinary', 'Bézier Motion', 'Three.js'],
    nextProjectId: '02-altitude'
  },
  {
    id: '02-altitude',
    number: '02',
    title: 'Altitude',
    tagline: 'Living suspended between cloud and stone.',
    industry: 'Architecture',
    discipline: 'Parametric Real Estate & Spatial Visualization',
    year: '2025',
    accentColor: '#536878', // Blue-gray
    shortStatement: 'An architectural visualization platform exploring vertical luxury living with real-time floor stack explosion and atmospheric day-to-dusk transitions.',
    description: 'Altitude presents a 48-story residential tower set atop an architectural site model. The interface allows prospects to explode residential levels, inspect floor plates, and experience sunlight shifts across glass facades.',
    challenge: 'Handling complex architectural geometries with dozens of residential floor plates while keeping initial load times under 2 seconds.',
    approach: 'Used Draco-compressed GLTF floor modules and procedural procedural daylight shader simulating realistic Rayleigh atmospheric scattering.',
    artDirection: 'Minimalist Swiss architectural blueprints, clean blue-gray horizon, brushed stainless steel, and pristine swimming pool caustics.',
    motionSystem: 'Smooth vertical separation (20–40cm floor offsets) with camera arcs maintaining vertical building line perspective.',
    techImplementation: 'GSAP ScrollTrigger synced with Three.js camera transforms and directional solar azimuth calculations.',
    performanceNotes: 'Frustum culling on unselected floor levels; shared PBR glass materials; dynamic LOD streaming.',
    results: [
      'Pre-leased 75% of penthouse residences within 30 days of launch',
      'Global architectural visualization award nominee 2025',
      'Smooth 60 FPS WebGL orbit on all modern browsers'
    ],
    metrics: [
      { label: 'Pre-Lease Rate', value: '75%' },
      { label: 'Floor Inspection', value: '92%' },
      { label: 'Initial Payload', value: '3.4 MB' }
    ],
    tags: ['Architecture', 'Exploded View', 'Day/Night', 'Real Estate'],
    nextProjectId: '03-kinetic'
  },
  {
    id: '03-kinetic',
    number: '03',
    title: 'Kinetic',
    tagline: 'Motion engineered into every fiber.',
    industry: 'Footwear',
    discipline: '3D Performance Footwear Configurator',
    year: '2025',
    accentColor: '#D72638', // Racing Red
    shortStatement: 'A high-performance technical sneaker configurator featuring progressive mechanical assembly, live material sweeps, and exploded component diagrams.',
    description: 'Kinetic breaks down a futuristic trail-running silhouette into its biomechanical components: carbon fiber plates, dual-density nitrogen foam, ballistic engineered mesh, and aerodynamic lacing systems.',
    challenge: 'Achieving continuous, non-jarring material and color transitions without popping or reloading textures.',
    approach: 'Wrote a custom WebGL transition shader that sweeps normal maps and roughness values from heel to toe with an electrified leading edge.',
    artDirection: 'High-contrast studio cyclorama, precision industrial markings, technical leader lines, and dynamic studio key lighting.',
    motionSystem: 'Multi-stage component assembly over 2.4s: sole enters from below, upper wraps into place, and laces thread continuously along Bézier curves.',
    techImplementation: 'React Three Fiber custom shader material, Zustand configurator state, and dual-colorway comparison split screen.',
    performanceNotes: 'Texture atlas packing for sneaker uppers; instanced lace eyelets; memory footprint under 32MB.',
    results: [
      'Reduced design validation cycles from 6 weeks to 3 days',
      'Over 250,000 custom shoe configurations generated in month one',
      'FWA of the Day winner'
    ],
    metrics: [
      { label: 'Configurations', value: '250K+' },
      { label: 'Material Sweep', value: '600ms' },
      { label: 'FPS Target', value: '60 FPS' }
    ],
    tags: ['Configurator', 'Footwear', 'Custom Shader', 'Kinetic'],
    nextProjectId: '04-verdant-lab'
  },
  {
    id: '04-verdant-lab',
    number: '04',
    title: 'Verdant Lab',
    tagline: 'Formulated in dialogue with living flora.',
    industry: 'Botanical Skincare',
    discipline: 'Organic 3D Fluid & Botanical Visualization',
    year: '2025',
    accentColor: '#7D9078', // Sage green
    shortStatement: 'A poetic cosmetic journey where frosted glass flacons emerge from soft morning mist, surrounded by orbiting botanical extracts and liquid surface ripples.',
    description: 'Verdant Lab demystifies clean botanical skincare. Users follow the transformation of wild-harvested botanicals into high-potency cellular serums with delicate transmission and fluid caustics.',
    challenge: 'Simulating translucent cosmetic gel and glass refraction smoothly in WebGL without expensive offline raytracing.',
    approach: 'Utilized Three.js MeshPhysicalMaterial with optimized transmission buffers and procedural wave ripple vertex shaders in the Petri dish.',
    artDirection: 'Moody emerald green environment, frosted cosmetic glass, translucent plant gels, dew drops, and soft studio volumetric light.',
    motionSystem: 'Gentle harmonic orbiting of botanical leaves, synchronized with descending fluid droplets and gentle bottle rotation.',
    techImplementation: 'Screen-space refraction shaders, volumetric mist particle planes, and scroll-linked extract reveal.',
    performanceNotes: 'Single render-target for transmission pass; simplified caustics baked into normal perturbation.',
    results: [
      'Conversion rate on luxury product bundles increased by 38%',
      'Highlighted in Vogue Digital Design Trends 2025',
      'Zero latency on mobile touch drag'
    ],
    metrics: [
      { label: 'Conversion Lift', value: '+38%' },
      { label: 'Refraction IOR', value: '1.52' },
      { label: 'Mobile Drop Rate', value: '0.2%' }
    ],
    tags: ['Skincare', 'Glass Refraction', 'Botanical', 'Cosmetics'],
    nextProjectId: '05-elemental-kitchen'
  },
  {
    id: '05-elemental-kitchen',
    number: '05',
    title: 'Elemental Kitchen',
    tagline: 'Heat, gravity, and the art of the pan.',
    industry: 'Food Visualization',
    discipline: 'Dynamic Food Physics & Exploded Choreography',
    year: '2025',
    accentColor: '#D24B35', // Tomato Red
    shortStatement: 'An exploded culinary animation capturing the visceral energy of cooking: searing cast iron, radial ingredient flight, and rising aromatic steam.',
    description: 'Elemental Kitchen dissects iconic signature recipes into their elemental parts. Watch fresh herbs, garlic, organic vegetables, and reduction sauces orbit radially before cascading into a sizzling cast-iron skillet.',
    challenge: 'Choreographing multi-body ingredient trajectories with distinct masses and realistic spin without heavy physics engine overhead.',
    approach: 'Pre-computed kinematic keyframe trajectories with procedural secondary wobble, combined with GPU particle steam emitters.',
    artDirection: 'Moody charcoal backdrop, incandescent amber warmth, cast-iron texture with oil sheen, and micro seasoning particles.',
    motionSystem: '0–8s sequence: pan tilt into composition, radial ingredient orbit, dynamic pan toss cascade, and steam eruption.',
    techImplementation: 'Three.js GPU particles for steam, custom normal maps for pan seasoning, and scrubbable GSAP timeline.',
    performanceNotes: 'Instanced seasoning flecks; clamped particle count to 150 on mobile devices.',
    results: [
      'Gold European Design Award in Digital Interactive',
      'Over 1.2M impressions across digital gastronomy platforms',
      'Sub-50ms interaction response time'
    ],
    metrics: [
      { label: 'Impressions', value: '1.2M+' },
      { label: 'Trajectory Points', value: '128' },
      { label: 'Interactive Scrub', value: '100%' }
    ],
    tags: ['Culinary Physics', 'Kinematics', 'Steam GPU', 'Gastronomy'],
    nextProjectId: '06-molecule-08'
  },
  {
    id: '06-molecule-08',
    number: '06',
    title: 'Molecule No. 08',
    tagline: 'The architecture of invisible allure.',
    industry: 'Luxury Fragrance',
    discipline: 'Molecular 3D Storytelling & Editorial Glass',
    year: '2025',
    accentColor: '#C78D46', // Amber
    shortStatement: 'An olfactory visualization mapping fragrance volatile chemistry: 3D molecular wireframes, amber glass flacons, and evaporating note particles.',
    description: 'Molecule No. 08 bridges perfumery and chemistry. Users dissect top, heart, and base notes through interactive molecular bonds that resolve into a heavy crystal perfume bottle under sweeping studio lights.',
    challenge: 'Balancing rigorous molecular geometry with sensual luxury editorial aesthetics and glass optical brilliance.',
    approach: 'Constructed procedurally generated molecular node-link graphs that transition into physical liquid volume inside the bottle.',
    artDirection: 'Graphite and dark charcoal backdrop, glowing golden amber liquid, clinical sans-serif annotations, and warm rim highlights.',
    motionSystem: 'Volatile top notes move swiftly at high frequency; heart notes swirl languidly; rich base notes settle with heavy acoustic weight.',
    techImplementation: 'MeshPhysicalMaterial with high clearcoat, procedural molecule lattice, and audio-reactive spectral highlights.',
    performanceNotes: 'Single-pass internal reflection approximation; low-polygon molecular nodes with instanced geometry.',
    results: [
      'Fragrance Foundation Finalist for Digital Experience',
      '42% increase in online discovery set sampling',
      'Average time spent exploring molecular notes: 3m 48s'
    ],
    metrics: [
      { label: 'Sample Discovery', value: '+42%' },
      { label: 'Notes Explored', value: '94%' },
      { label: 'Bottle IOR', value: '1.54' }
    ],
    tags: ['Fragrance', 'Molecular 3D', 'Amber Glass', 'Luxury'],
    nextProjectId: '07-habitat-system'
  },
  {
    id: '07-habitat-system',
    number: '07',
    title: 'Habitat System',
    tagline: 'Living space defined by modular harmony.',
    industry: 'Furniture',
    discipline: 'Architectural Interior & Modular Configurator',
    year: '2024',
    accentColor: '#684C38', // Walnut brown
    shortStatement: 'A modular interior design system featuring isometric room assembly, grid-snapping cabinetry, and architectural shadow precision.',
    description: 'Habitat System allows interior architects to reconfigure bespoke walnut cabinets, floating stone shelving, and acoustic dividers. Modules glide to new positions while preserving spatial continuity.',
    challenge: 'Preventing visual popping during room reconfigurations and calculating seamless non-intersecting movement paths.',
    approach: 'Implemented an architectural grid collision matrix and GSAP coordinate interpolators that slide existing modules into new layouts.',
    artDirection: 'Warm limestone floors, rift-sawn American walnut, soft daylight casts, and minimal technical dimension callouts.',
    motionSystem: 'Floors draw outward from center, walls extrude vertically, and cabinet doors attach with mechanical dampening.',
    techImplementation: 'Isometric camera projection, contact shadow planes, dynamic measurement dimension overlays in SVG.',
    performanceNotes: 'Geometry instancing for modular hardware; baked ambient occlusion maps for static wall panels.',
    results: [
      'Adopted by 35 leading European interior architecture practices',
      'Zero spatial configuration errors in manufacturing orders',
      'Streamlined spec sheet export to under 5 seconds'
    ],
    metrics: [
      { label: 'Design Studios', value: '35+' },
      { label: 'Config Accuracy', value: '100%' },
      { label: 'Grid Snap Latency', value: '< 16ms' }
    ],
    tags: ['Furniture', 'Modular', 'Isometric', 'Interiors'],
    nextProjectId: '08-layered'
  },
  {
    id: '08-layered',
    number: '08',
    title: 'Layered',
    tagline: 'Every stratum crafted with patience.',
    industry: 'Café & Dessert',
    discipline: 'Fluid Stratification & Confectionery 3D',
    year: '2025',
    accentColor: '#B2743D', // Caramel
    shortStatement: 'A dessert and specialty drink experience showcasing multi-density liquid pouring, stratified cream layering, and spiraling caramel drizzles.',
    description: 'Layered captures the tactile indulgence of artisanal café creations. Users customize glass size, base espresso, cold foams, and garnishes while watching fluids settle physically into place.',
    challenge: 'Rendering believable fluid strata and foam textures without laggy browser fluid simulations.',
    approach: 'Engineered layered procedural mesh geometries with animated vertex wave displacement and transmission refraction materials.',
    artDirection: 'Warm Parisian café morning light, crystal fluted glassware, velvety microfoam, golden espresso crema, and dark cocoa dust.',
    motionSystem: 'Glass rotates into position → espresso pours and settles → whipped cream expands upward → caramel spirals downward.',
    techImplementation: 'Three.js procedural fluted cylinder geometry, morph target wave displacement, and live nutritional calculation engine.',
    performanceNotes: 'Pre-computed spiral Bezier curves for syrup; shared liquid transmission textures across glass layers.',
    results: [
      'Selected for Behance Interaction Design curated showcase',
      '55% increase in mobile online café pre-orders',
      'Average frame rate maintained at 60 FPS on iOS and Android'
    ],
    metrics: [
      { label: 'Mobile Orders', value: '+55%' },
      { label: 'Liquid Layers', value: '5 Layers' },
      { label: 'FPS Mobile', value: '60 FPS' }
    ],
    tags: ['Café', 'Liquid Stratification', 'Dessert', 'Interactive'],
    nextProjectId: '09-formula'
  },
  {
    id: '09-formula',
    number: '09',
    title: 'Formula',
    tagline: 'Clean clinical science meets botanical luxury.',
    industry: 'Cosmetic Laboratory',
    discipline: 'Scientific Laboratory Scroll Narrative',
    year: '2025',
    accentColor: '#5B7065', // Muted laboratory green
    shortStatement: 'A clinical cosmetic laboratory narrative guiding users through botanical extraction, glass tubing fluid transfer, and automated bottle capping.',
    description: 'Formula walks through 4 distinct stages of cosmetic synthesis: botanical compound isolation, ultrasonic extraction, micro-filtration through lab glassware, and precision packaging.',
    challenge: 'Maintaining a calm, luxury scientific tone while guiding the user through complex chemical process visualizations.',
    approach: 'Synchronized Lenis smooth scroll with Three.js camera transitions and tube fluid fill shaders.',
    artDirection: 'Minimalist warm gray laboratory, borosilicate glass flasks, illuminated metric markings, and pristine pipettes.',
    motionSystem: 'Scroll controls timeline scrub: particles dissolve from plant tissue, travel through glassware coils, and fill cosmetic dropper bottles.',
    techImplementation: 'CatmullRomCurve3 tube geometries with UV-offset fluid shaders and dynamic measurement labels.',
    performanceNotes: 'Instanced laboratory glassware stand hardware; unified glass shader for all scientific vessels.',
    results: [
      'Reduced customer skepticism regarding synthetic-free claims by 68%',
      'Featured on Webflow & Three.js community showcases',
      'Scroll scrubbing latency under 8ms'
    ],
    metrics: [
      { label: 'Trust Lift', value: '+68%' },
      { label: 'Narrative Stages', value: '4 Stages' },
      { label: 'Scrub Latency', value: '< 8ms' }
    ],
    tags: ['Laboratory', 'Scroll Scrub', 'Glassware', 'Skincare'],
    nextProjectId: '10-atelier'
  },
  {
    id: '10-atelier',
    number: '10',
    title: 'Atelier',
    tagline: 'High jewelry conceived as wearable architecture.',
    industry: 'Haute Joaillerie',
    discipline: 'Fine Jewelry & Gemological 3D Configurator',
    year: '2025',
    accentColor: '#D4AF37', // Champagne Gold
    shortStatement: 'An ultra-refined solitaire ring configurator featuring authentic 57-facet Tolkowsky diamond refraction, curved 6-prong gallery baskets, and precious metal switching.',
    description: 'Atelier celebrates high jewelry craftsmanship. Prospects inspect brilliant-cut solitaire diamonds under high-dynamic-range studio lighting, rotate 360°, trigger exploded component diagrams, and customize metals.',
    challenge: 'Achieving realistic total internal reflection and scintillation without flat, hollow transparent glass artifacts.',
    approach: 'Constructed an authentic 57-facet geometry with dual-layer TIR optical shaders and synthesized a jewelry studio environment map via PMREMGenerator.',
    artDirection: 'Dark graphite to warm champagne background, razor-sharp facet speculars, mirror-polished metals, and delicate claw prongs.',
    motionSystem: 'Smooth 3/4 beauty rotation, gemstone lowering into 6-prong basket, prongs flexing inward, and exploded component leader lines.',
    techImplementation: 'Tolkowsky diamond facet algorithm, Catmull-Rom curved tube prongs, and real-time metal roughness/color interpolation.',
    performanceNotes: 'Pre-computed normal vectors for all 120 facet triangles; shared studio PMREM environment across band and crown.',
    results: [
      'Generated $2.8M in custom bridal jewelry commissions in Q1',
      'Average user engagement: 5m 22s in 360° inspection mode',
      'Flawless facet fire and dispersion at 60 FPS'
    ],
    metrics: [
      { label: 'Sales Volume', value: '$2.8M' },
      { label: 'Facets Modeled', value: '57 Facets' },
      { label: 'Diamond IOR', value: '2.417' }
    ],
    tags: ['Jewelry', 'Diamond Refraction', 'PBR Metal', 'Atelier'],
    nextProjectId: '11-bean-to-cup'
  },
  {
    id: '11-bean-to-cup',
    number: '11',
    title: 'From Bean to Cup',
    tagline: 'Precision thermodynamics behind every extraction.',
    industry: 'Coffee Technology',
    discipline: 'Technical Cutaway & Process Visualization',
    year: '2024',
    accentColor: '#A06535', // Deep roasted bean
    shortStatement: 'An interactive mechanical cutaway experience tracking the thermodynamic journey of espresso: bean hopper, burr grinder, pressurized water coils, and golden crema flow.',
    description: 'From Bean to Cup demystifies high-end commercial espresso machinery. Users scrub through grinding, tamping, 9-bar pressure extraction, and milk steaming through transparent mechanical conduits.',
    challenge: 'Coordinating synchronized particle physics, fluid flows, and rotating mechanical gears in a single performant scene.',
    approach: 'Combined instanced bean meshes with animated texture shaders along curved copper tubes and pressure gauge dials.',
    artDirection: 'Industrial copper, brushed steel, tempered dark glass, warm steam condensations, and technical engineering callouts.',
    motionSystem: 'Mechanical rotation of conical burrs, particle funnel cascade, heating coil glow shift, and fluid ribbon pour.',
    techImplementation: 'Three.js InstancedMesh for coffee grounds, UV animated liquid shader, and GSAP timeline scrubbing.',
    performanceNotes: 'Instanced 350 coffee grounds in a single draw call; automatic LOD reduction on mechanical fasteners.',
    results: [
      'Commercial barista training time reduced by 40%',
      'Winner of Specialty Coffee Association Innovation Award 2024',
      'Zero frame drops during continuous scroll scrub'
    ],
    metrics: [
      { label: 'Training Time', value: '-40%' },
      { label: 'Pressure Bars', value: '9.0 Bar' },
      { label: 'Grounds Instanced', value: '350' }
    ],
    tags: ['Coffee', 'Engineering', 'Process Visualization', 'Mechanics'],
    nextProjectId: '12-living-modules'
  },
  {
    id: '12-living-modules',
    number: '12',
    title: 'Living Modules',
    tagline: 'Fluid domestic spaces that evolve with life.',
    industry: 'Interior Architecture',
    discipline: 'Architectural Blueprint Morphing & Interior Systems',
    year: '2024',
    accentColor: '#706050', // Warm taupe wood
    shortStatement: 'An architectural interior platform where 2D blueprint schematics extrude into 3D Scandinavian living spaces and reconfigure seamlessly between day and night.',
    description: 'Living Modules allows urban dwellers to test compact domestic layouts. Floor plan lines rise into acoustic partition walls, while modular furniture morphs along curved trajectories between entertaining and resting modes.',
    challenge: 'Extruding 2D blueprint line vectors into fully textured 3D architectural rooms without visual seams.',
    approach: 'Built custom ExtrudeGeometry builders from 2D SVG paths, paired with smooth position/rotation interpolation matrices for all furniture.',
    artDirection: 'Nordic minimalist aesthetics, light birch, linen upholstery, architectural soft shadows, and warm ambient sunlight.',
    motionSystem: 'Line drawing intro → vertical wall extrusion → furniture blocks rising from floor plate → smooth curved path reconfiguration.',
    techImplementation: 'SVG path parsers, Three.js ExtrudeGeometry, daylight shadow maps, and first-person camera mode.',
    performanceNotes: 'Baked lightmaps for static walls; instanced Scandinavian chair legs and lighting fixtures.',
    results: [
      'Featured in Dezeen Architectural Innovations 2024',
      'Over 80,000 custom micro-apartment configurations created',
      'Maintained under 5MB initial bundle size'
    ],
    metrics: [
      { label: 'Apartments Built', value: '80K+' },
      { label: 'Layout Modes', value: '3 Layouts' },
      { label: 'Asset Payload', value: '4.2 MB' }
    ],
    tags: ['Architecture', 'Blueprint 2D-3D', 'Interiors', 'Morphing'],
    nextProjectId: '13-blend'
  },
  {
    id: '13-blend',
    number: '13',
    title: 'Blend',
    tagline: 'Customized wellness in every pour.',
    industry: 'Beverage Systems',
    discipline: 'Custom Beverage Configurator with Synchronized Panel',
    year: '2025',
    accentColor: '#3A7D60', // Matcha Green
    shortStatement: 'A modern beverage customization platform pairing real-time 3D cup dynamics with a responsive configuration panel for base, milk, flavor, and toppings.',
    description: 'Blend brings custom health drinks to life. As users select cold-pressed juices, adaptogens, oat milks, and superfood toppings, ingredients arc into the cup, blending fluid colors in real time.',
    challenge: 'Synchronizing real-time 3D liquid color blending and volume changes with live nutritional and pricing calculations.',
    approach: 'Engineered a unified Zustand store driving both the WebGL fluid shader color uniforms and the HTML editorial pricing counter.',
    artDirection: 'Vibrant clean wellness aesthetic, fluted glass tumbler, layered colorful fluids, floating fruit slices, and clean typography.',
    motionSystem: 'Ingredients arc into cup over 400ms, liquid volume rises, fluid color interpolates across gradient, and price counters roll vertically.',
    techImplementation: 'Fragment shader gradient blending, instanced ice cubes with caustics, and responsive bottom sheet on mobile.',
    performanceNotes: 'Mobile DPR clamped to 1.25; fluid surface ripples driven by lightweight vertex shader sine wave.',
    results: [
      'Pre-order customization volume increased by 72%',
      'Featured on Product Hunt Top 5 Design Products of the Week',
      'Zero UI lockup during rapid ingredient selection'
    ],
    metrics: [
      { label: 'Custom Orders', value: '+72%' },
      { label: 'Blending Time', value: '500ms' },
      { label: 'Color States', value: '16 Blends' }
    ],
    tags: ['Beverage', 'Configurator', 'UI Sync', 'Wellness'],
    nextProjectId: '14-casa-horizon'
  },
  {
    id: '14-casa-horizon',
    number: '14',
    title: 'Casa Horizon',
    tagline: 'Where horizon lines blur with modern shelter.',
    industry: 'Property Narrative',
    discipline: 'Cinematic Architectural Narrative & Walkthrough',
    year: '2025',
    accentColor: '#4A6B82', // Mediterranean blue
    shortStatement: 'A cinematic coastal property development narrative transitioning seamlessly from aerial drone perspective through door frames into infinity pool panoramas.',
    description: 'Casa Horizon represents an ultra-luxury cliffside retreat in Mallorca. Prospects experience an uninterrupted match-cut camera flight from rugged topography into sunlit living pavilions.',
    challenge: 'Transitioning between exterior landscape and interior architectural finishes without jarring camera clipping or texture pop-in.',
    approach: 'Constructed a spline camera dolly path with doorway match-cut geometry masks and dynamic LOD interior streaming.',
    artDirection: 'Dry limestone masonry, floor-to-ceiling panoramic glass, Mediterranean azure sea, olive trees, and warm late-afternoon golden hour.',
    motionSystem: 'Continuous curvilinear camera path with quaternion orientation damping, dollhouse roof separation, and residence hotspots.',
    techImplementation: 'CatmullRomCurve3 camera flight, distance-based LOD mesh loading, and interactive floor plan callouts.',
    performanceNotes: 'Distant topography rendered with simplified low-poly collision meshes; interior furniture loaded only upon entry.',
    results: [
      'All 8 coastal villa properties sold out prior to ground-breaking',
      'Real Estate Digital Marketing Award winner 2025',
      'Interactive tour completed by 91% of high-net-worth prospects'
    ],
    metrics: [
      { label: 'Villa Sell-Out', value: '100%' },
      { label: 'Tour Completion', value: '91%' },
      { label: 'Spline Points', value: '64 Points' }
    ],
    tags: ['Architecture', 'Cinematic Path', 'Luxury Villa', 'Real Estate'],
    nextProjectId: '15-ritual'
  },
  {
    id: '15-ritual',
    number: '15',
    title: 'Ritual',
    tagline: 'Morning devotion transformed into a craft.',
    industry: 'Coffee E-Commerce',
    discipline: 'E-Commerce Transition & Interactive Drink Studio',
    year: '2025',
    accentColor: '#9C6233', // Warm caramel crema
    shortStatement: 'A specialty coffee e-commerce experience that flows seamlessly from cinematic layered pour storytelling into an interactive drink customizer.',
    description: 'Ritual redefines online coffee purchasing. The experience begins with an intimate, slow-motion layered pour sequence before camera pullback shifts the cup left, revealing bespoke customization options.',
    challenge: 'Fusing emotional, cinematic brand storytelling directly with high-conversion e-commerce checkout without jarring page reloads.',
    approach: 'Seamless viewport split: camera pulls back 10% and repositions drink to 30% viewport width while right-side editorial ordering panel slides in.',
    artDirection: 'Warm Parisian coffeehouse ambience, handcrafted stoneware, rich crema marbling, fluted glassware, and tactile typography.',
    motionSystem: 'Story mode (layered pour, ice settling, milk foam crown) smoothly interpolates into configurator mode with hot/iced cup morphing.',
    techImplementation: 'Unified Three.js scene with smooth camera matrix lerping, morph target cup silhouettes, and live shopping cart state.',
    performanceNotes: 'Instant add-to-cart feedback without WebGL interruption; lazy-loaded checkout modal.',
    results: [
      'Average order value rose by 44% compared to standard Shopify storefront',
      'Return customer rate increased by 28%',
      'Featured in Apple Design Awards Showcase for Web Experiences'
    ],
    metrics: [
      { label: 'AOV Increase', value: '+44%' },
      { label: 'Story-to-Cart', value: '64%' },
      { label: 'Camera Lerp', value: '850ms' }
    ],
    tags: ['Coffee', 'E-Commerce', 'Morphing Cup', 'Storytelling'],
    nextProjectId: '01-gather'
  }
];

export const portfolioIdentity = {
  name: 'Julian Vance',
  title: 'Creative Developer & 3D Experience Designer',
  location: 'Paris, London & Worldwide',
  email: 'julian@vance-atelier.com',
  status: 'AVAILABLE FOR SELECT COMMISSIONS — 2026',
  social: [
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'Behance', url: 'https://behance.net' },
    { name: 'GitHub', url: 'https://github.com/rajeshkanna-s' }
  ]
};
