export async function action({ request }) {
  const body = await request.formData();
  console.log('body', body);
  return null;
}

export default function SignUp() {


  return (
    <main>
      <h1>Sign up</h1>
      <p>So you finally wanna join huh?</p>

      <form method="post" action="/user/sign-up">
        <label>
          email
          <input name="email" type="email" />
        </label>
        <label>
          password
          <input name="password" type="password" />
        </label>
        <input type="submit"/>
      </form>
    </main>
  );
}