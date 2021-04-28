import { useEffect, useState } from 'react';
import { useAuth } from '../../global/AuthContext';
import { db } from '../../global/Firebase';

const Profil = () => {
    const [userData, setUserData] = useState([]);
    const { currentUser } = useAuth();

    useEffect(async() => {
        db.collection("users").where("email", "==", currentUser.email)
        .get()
        .then(async (querySnapshot) => {
            let document = []
            await querySnapshot.forEach((doc) => {
                document.push({...doc.data(), id: doc.id});
                // doc.data() is never undefined for query doc snapshots
                console.log(document);
            });
            await setUserData(document)
            console.log(userData)
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    },[])
        
        



    return (
            <div className="profil-container"> 
                {userData.map((user) => (
                    <div key={user.id} id="profil-container">
                        <h2 >
                            { "Hej, " + user.fullName}
                        </h2>
                        <p>
                            {"Din mail: " + user.email}
                        </p>
                    </div>
                ))

                }
            </div>
       
    )
}

export default Profil;