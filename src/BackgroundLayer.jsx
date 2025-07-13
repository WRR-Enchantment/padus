// BackgroundLayer.jsx
export default function BackgroundLayerShape() {
  return (
  <img
  src="/bg.jpg"
  alt="Background"
  className="fixed bottom-0 left-1/2 transform -translate-x-1/2 scale-[1.3] z-[-50] select-none pointer-events-none" 
  style={{
    width: '100vw',
    height: 'auto',
    objectFit: 'contain',
  }}
    />
  );
}
