import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { json, type ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { LoginSchema } from "@virgile/shared";
import { ErrorList, Field } from "components/forms";
import { LoadingButton } from "components/shadcn-ui/button.tsx";
import z from "zod";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: LoginSchema.superRefine(({ email }, ctx) => {
      const doesUserExist = email === "virgile@example.com";

      if (doesUserExist) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["email"],
          message: "Email already exists",
        });
      }
    }),
  });

  if (submission.status !== "success") {
    return json(
      { result: submission.reply() },
      {
        status: 400,
      },
    );
  }
  return json({ result: submission.reply() });
};

const LoginPage = () => {
  const actionData = useActionData<typeof action>();
  const transition = useNavigation();
  const isLoading = transition.state === "submitting";

  const [form, fields] = useForm({
    id: "login-form",
    constraint: getZodConstraint(LoginSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: LoginSchema,
      });
    },
    lastResult: actionData?.result,
  });

  return (
    <div className="max-w-[800px] mx-auto">
      <h2 className="text-xl pb-4">Connectez-vous !</h2>
      <p className="text-xl font-medium text-midnightblue">
        La manière la plus simple de faire collecter et recycler ses déchets
      </p>

      <div className="mt-8">
        <Form
          {...getFormProps(form)}
          method="POST"
          reloadDocument
          action="/login"
          className="flex flex-col space-y-4 lg:space-y-6"
        >
          <Field
            inputProps={{
              ...getInputProps(fields.email, {
                type: "email",
              }),
              autoComplete: "email",
            }}
            labelProps={{
              children: "Email",
            }}
            errors={fields.email.errors}
          />

          <Field
            inputProps={{
              ...getInputProps(fields.password, {
                type: "password",
              }),
              type: "password",
            }}
            labelProps={{
              children: "Password",
            }}
            errors={fields.password.errors}
          />

          <ErrorList errors={form.errors} id={form.errorId} />

          <LoadingButton
            isLoading={isLoading}
            disabled={isLoading}
            type="submit"
            variant="midnightblue"
            size="lg"
            className="ml-auto w-fit"
          >
            Sign in
          </LoadingButton>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
