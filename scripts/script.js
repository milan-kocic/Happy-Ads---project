async function addNewUser(
  firstName,
  lastName,
  username,
  password,
  email,
  adress,
  city,
  phoneNumber,
  gender,
  admin
) {
  const response = await fetch(`http://localhost:3000/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      password,
      email,
      adress,
      city,
      phoneNumber,
      gender,
      admin,
    }),
  });
  const user = await response.json();
  return user;
}
export { addNewUser };
