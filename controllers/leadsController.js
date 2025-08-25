let leads = [];
let nextId = 1;

exports.listLeads = (req, res) => {
  res.json(leads);
};

exports.createLead = (req, res) => {
  const { name, phone } = req.body || {};
  if (!name || !phone) {
    return res.status(400).json({ error: "name and phone are required" });
  }
  const lead = {
    id: nextId++,
    name,
    phone,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  leads.push(lead);
  res.status(201).json(lead);
};

exports.getLead = (req, res) => {
  const id = Number(req.params.id);
  const lead = leads.find((l) => l.id === id);
  if (!lead) return res.status(404).json({ error: "lead not found" });
  res.json(lead);
};
