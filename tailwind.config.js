
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { purple:"#34204d", forest:"#123b31", bronze:"#b88746", gold:"#d5a253" }
      },
      boxShadow: { glow: "0 0 0 1px rgba(255,255,255,.06), 0 10px 30px rgba(0,0,0,.25)" }
    }
  },
  plugins: []
};
