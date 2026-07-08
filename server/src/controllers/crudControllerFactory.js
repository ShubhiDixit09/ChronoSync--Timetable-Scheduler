// Generates basic CRUD handlers for straightforward resources (Faculty, Room, Subject, Batch, Department).
// Swap in bespoke logic per-resource later as validation needs grow.
const crudControllerFactory = (Model) => ({
  create: async (req, res, next) => {
    try {
      const doc = await Model.create(req.body);
      res.status(201).json(doc);
    } catch (err) {
      next(err);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const docs = await Model.find();
      res.json(docs);
    } catch (err) {
      next(err);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const doc = await Model.findById(req.params.id);
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json(doc);
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json(doc);
    } catch (err) {
      next(err);
    }
  },
  remove: async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Deleted' });
    } catch (err) {
      next(err);
    }
  },
});

module.exports = crudControllerFactory;
