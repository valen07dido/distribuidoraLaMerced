const express = require('express');
const jwt = require('jsonwebtoken');
const {User}=require("../../db")

const activateUserControler=async(token)=>{
    const decoded = jwt.verify(token, process.env.SECRET_KEY );

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return {
        error:true,
        response:"Usuario no encontrado"
      }
    }

    user.isActive = true;
    user.isVerified = true;
    await user.save();
}
