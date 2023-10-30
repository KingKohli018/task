const bookmodel = require("../model/books");

exports.addbooks = async (req, res) => {
  try {
    const { userId, title, author, summary } = req.body;

    const bookfind = await bookmodel.findOne({ title: title });

    if (bookfind) {
      res.send({ status: true, message: "book allready exist" });
      return;
    }

    const addbook = await bookmodel.create({
      userId: userId,
      title: title,
      author: author,
      summary: summary,
    });

    res.send({
      status: true,
      message: "Successfully add books",
      bookdetails: addbook,
    });
  } catch (error) {
    res.send({ status: false, message: "Something went wrong!!" });
  }
};

// get all books.................

exports.getallbooks = async (req, res) => {
  try {
    const findallbooks = await bookmodel.find();

    res.send({
      status: true,
      message: "Successfully get books",
      booksdetails: findallbooks,
    });
  } catch (error) {
    res.send({ status: false, message: "Something went wrong !!" });
  }
};

//update books details ...............................

exports.updatebooks = async (req, res) => {
  try {
    const { title, author, summary } = req.body;

    const bookfind = await bookmodel.findById( req.params.bookId);

    if (!bookfind) {
      res.send({ status: true, message: "book not found" });
      return;
    }

    const updatebooks = await bookmodel.findByIdAndUpdate(
      req.params.bookId,
      {
        title: title,
        author: author,
        summary: summary,
      },
      { new: true }
    );

    await updatebooks.save();

    res.send({
      status: true,
      message: "Succesfully update booksdetails",
      booksdetails: updatebooks,
    });
  } catch (error) {
    res.send({ status: false, message: "Something went wrong !!" });
  }
};

//delete books ............................

exports.deletebook = async (req, res) => {
  try {
    const deletebook = await bookmodel.findByIdAndDelete(req.params.bookId);
    res.send({
      status: true,
      message: "Succesfully delete book",
      booksdetails: deletebook,
    });
  } catch (error) {
    res.send({ status: false, message: "Something went wrong !!" });
  }
};
