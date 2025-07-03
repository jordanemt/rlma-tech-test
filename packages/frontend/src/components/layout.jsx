function Layout({ children }) {
  return (
    <main
      id="app"
      className="flex flex-col p-4 h-screen bg-gray-100 text-gray-900"
    >
      <div className="bg-white shadow-mdg h-full p-8 overflow-y-scroll">
        {children}
      </div>
    </main>
  );
}

export default Layout;
