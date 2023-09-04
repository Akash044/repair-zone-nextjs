function Navbar() {
  const classNav =
    "px-2 py-2 rounded-3xl hover:cursor-pointer transition duration-500 hover:bg-violet-500 hover:text-white";
  return (
    <main className="container mx-auto px-2 py-1 my-2 bg-violet-200 border-violet-200 border-2 rounded-3xl">
      <nav className="flex justify-between items-center font-bold">
        <div className={`${classNav} items-center `}>Repair Zone</div>
        <ul className="flex justify-evenly  gap-2 font-bold">
          <li className={classNav}>Home</li>
          <li className={classNav}>Dashboard</li>
          <li className={classNav}>Contact</li>
          <li className={classNav}>Login</li>
        </ul>
      </nav>
    </main>
  );
}

export default Navbar;
