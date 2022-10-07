import { useContext, useState, useEffect, useCallback } from "react"
import { Context } from "../../context/context"
import debounce from 'lodash.debounce';
import { firestore } from '../../services/firebase';

export const ChooseUsername = () => {
  const { 
    user, 
    username, 
    signed, 
    signOut } = useContext(Context);
  
  const [ formValue, setFormValue ] = useState('');
  const [ isValid, setIsValid ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

    const onSubmit = async (e) => {
      e.preventDefault();
      const userRef = firestore.doc(`users/${user.uid}`);
      const usernameRef = firestore.doc(`usernames/${formValue}`);

      const batch = firestore.batch();
      batch.set(userRef, { 
        username: formValue,
        photoURl: user.photoURl,
        displayName: user.displayName,
      });
      batch.set(usernameRef, {
        uid: user.uid
      });

      await batch.commit();
    }

    const onChange = (e) => {
      const value = e.target.value.toLowerCase();
      const regex = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

      if (value.length < 3) {
        setFormValue(value);
        setLoading(false);
        setIsValid(false);
      }
  
      if (regex.test(value)) {
        setFormValue(value);
        setLoading(true);
        setIsValid(false);
      }
    };
  
    const checkUsername = useCallback(
      debounce(async (username) => {
        if (username.length >= 3) {
          const ref = firestore.doc(`usernames/${username}`);
          const { exists } = await ref.get();
          console.log('Firestore read executed!');
          setIsValid(!exists);
          setLoading(false);
        }
      }, 500),
      []
    );

    function UsernameMsg ({ username, isValid, loading }) {
      if (loading) {
        return <p>Checking...</p>;
      } else if (isValid) {
        return <p className="text-success">{ username } is available!</p>;
      } else if (username && !isValid) {
        return <p className="text-danger">{ username } is taken!</p>;
      } else {
        return <p></p>;
      }
    }

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form
          onSubmit={ onSubmit }
        >
          <input 
            name='username'
            placeholder='digite seu nome username'
            value={ formValue }
            onChange={ onChange }
          />
          <UsernameMsg 
            username={ formValue }
            isValid={ isValid }
            loading={ loading }
          />
          <button 
            type='submit'
            className='btnSubmit'
            disabled={ !isValid }
          >
            Submit
          </button>
          <h3>Debug State</h3>
          <div>
            Username: { formValue }
            <br />
            Loading: { loading.toString() }
            <br />
            Username Valid: { isValid.toString() }
          </div>
        </form>
        <button onClick={ () => signOut() }>
          Sign Out
        </button>
      </section>
    )
  )
}