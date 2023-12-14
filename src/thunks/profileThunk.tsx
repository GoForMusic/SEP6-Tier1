import { Dispatch } from "redux";



    export const changePassword = (userId: string, password: string) => async () => {

        try {

            const requestBody = {
                userId : userId,
                password: password,
            };


            const updatedData = await fetch(`https://tier2.azurewebsites.net/account`, {

                method: "PATCH",
                mode: 'cors',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),

            });

            if (!updatedData.ok) {

                throw new Error("Failed to change password");
            } else { 
                console.log("Password successfully changed");
            } 

        } catch (error) {

            console.error('Error', error)
            
        }


        }


    