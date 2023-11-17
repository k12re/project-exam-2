function BookingPage() {
  return (
    <>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold px-4">Create Booking</h1>
      </div>
      <div className="max-w-md mx-auto">
        <div className="mb-4 rounded-2xl p-4 backdrop-blur-lg bg-black/30 inset-0 border border-green">
          <form id="registerform">
            <label className="block text-white-pink">
              <label htmlFor="name" className="block">
                <input
                  placeholder="Please enter username..."
                  autoComplete="name"
                  type="text"
                  id="name"
                  className="mt-2 mb-8 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-pink"
                />
              </label>
              <label htmlFor="email" className="block">
                <input
                  placeholder="Please enter email..."
                  autoComplete="email"
                  type="text"
                  id="email"
                  className="mt-2 mb-8 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-pink"
                />
              </label>
              <label htmlFor="password" className="block">
                <input
                  placeholder="Please enter your password..."
                  type="password"
                  id="password"
                  className="mt-2 mb-8 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-pink"
                />
              </label>
              <label htmlFor="avatar" className="block">
                <input
                  placeholder="Please enter valid image url..."
                  type="text"
                  id="avatar"
                  className="mt-2 mb-6 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-pink"
                />
              </label>
              <label
                htmlFor="venueManager"
                className="inline-block ml-2 mb-6 text-dark-green dark:text-white-pink"
              >
                Manager
              </label>
              <input
                className="
              form-checkbox ml-3 h-5 w-5 rounded-md
              dark:border-pink
              border-green
              dark:checked:bg-pink
              checked:bg-green
              dark:bg-white
              bg-white
              active:bg-white-pink dark:active:bg-white-pink
              hover:bg-white-pink checked:hover:bg-dark-green
              dark:hover:bg-light-pink
              focus:bg-white-pink dark:focus:bg-white-pink
              checked:focus:bg-green dark:checked:focus:bg-pink dark:focus:ring-pink focus:ring-green
            "
                type="checkbox"
                id="venueManager"
              ></input>

              <button className="btn-primary">Register</button>
            </label>
          </form>
        </div>
      </div>
    </>
  );
}

export default BookingPage;
