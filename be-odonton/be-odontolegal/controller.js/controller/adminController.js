const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.initializeAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin já inicializado!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({ username, password: hashedPassword, role: 'admin' });
    await admin.save();

    res.status(201).json({ message: 'Admin inicializado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao inicializar admin', error });
  }
};
