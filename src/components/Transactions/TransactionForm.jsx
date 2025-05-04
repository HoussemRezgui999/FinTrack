import { Formik, Form, Field } from "formik";
import { TextField, Button, Stack, MenuItem } from "@mui/material";
import { motion } from "framer-motion";
import * as Yup from "yup";

const validationSchema = Yup.object({
  amount: Yup.number().required("Required"),
  description: Yup.string().required("Required"),
  category_id: Yup.number().required("Required"),
  date: Yup.date().required("Required"),
});

export const TransactionForm = ({ categories, onSubmit }) => (
  <Formik
    initialValues={{ amount: "", description: "", category_id: "", date: "" }}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ isSubmitting }) => (
      <Form>
        <Stack spacing={3}>
          <Field
            as={TextField}
            name="amount"
            label="Amount"
            type="number"
            fullWidth
            variant="outlined"
          />

          <Field
            as={TextField}
            name="description"
            label="Description"
            fullWidth
            variant="outlined"
          />

          <Field
            as={TextField}
            name="category_id"
            label="Category"
            select
            fullWidth
            variant="outlined"
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Field>

          <Field
            as={TextField}
            name="date"
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              fullWidth
            >
              Add Transaction
            </Button>
          </motion.div>
        </Stack>
      </Form>
    )}
  </Formik>
);
