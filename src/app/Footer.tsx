export default function Footer() {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 bg-cover bg-center text-white py-4 flex justify-center items-center"
      style={{
        backgroundImage: `url('https://canada1.discourse-cdn.com/flex011/uploads/subspace/optimized/2X/a/a1a34185d731c22d9d01b06fc5ddf31300a7a7c8_2_690x388.jpeg')`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative z-10">
        <span>Made with 🖤 by hallenjay for Autonomys @2024</span>
      </div>
    </footer>
  );
}
