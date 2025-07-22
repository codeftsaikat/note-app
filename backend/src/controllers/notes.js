export const getNotes = async (req, res) => {
  res.status(201).json({ messege: "Note created successfully" });
};

export const createNotes = (req, res) => {
  res.status(201).json({ messege: "Note created successfully" });
};

export const updateNotes = (req, res) => {
  res.status(200).json({ messege: "Note updated successfully" });
};

export const deleteNotes = (req, res) => {
  res.status(200).json({ messege: "Note deleted successfully" });
};
