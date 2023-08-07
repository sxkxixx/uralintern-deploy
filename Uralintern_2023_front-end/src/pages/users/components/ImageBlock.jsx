import React from 'react';
import classes from '../css/ChangeUser.module.css'
import { domen, useChangeImageMutation, useDeleteImageMutation } from '../../../redux/authApi';

function ImageBlock({user}) {
    //console.log(user);

    const [changePhoto] = useChangeImageMutation()
    const [delPhoto] = useDeleteImageMutation()
    const updatePhoto = async (photos)=>{
        const formData = new FormData();
        formData.append("image", photos[0], photos[0].name);

        //console.log(formData.image);
        changePhoto({id:user.id, body: formData});


    };
    const deletePhoto = async () =>{
        await delPhoto({id:user.id})

    };
    return (
        <div className={classes["main-profile"]}>
        <h2>Настройки</h2>
        <img className={classes["photo-student"]} alt="123" src={user.image? domen + user.image: require("../../../images/profile.svg").default} width="135" height="135"/>
        <div className={classes["photo"]}>
                            <label
                                className={classes["input__file-button"]}
                                htmlFor="input__file"
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        updatePhoto(e.target.files)
                                    }
                                    id="input__file"
                                    className={`input ${classes["input__file"]}`}
                                />
                                <span >Изменить фото</span>
                            </label>
                            <p
                                onClick={() => deletePhoto()}
                                className={classes["photo_del"]}
                            >
                                Удалить фото
                            </p>
                        </div>
    </div>
    );
}

export default ImageBlock;