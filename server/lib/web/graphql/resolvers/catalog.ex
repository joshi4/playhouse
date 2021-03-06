defmodule Web.GraphQL.Resolvers.Catalog do
  alias Database.Catalog
  alias Web.GraphQL.Errors

  def act_create(_, args, %{context: %{current_user: user}}) do
    # TODO: Need to pass in question and answer type
    case Catalog.act_create(user, nil, nil, args) do
      {:error, changeset} ->
        {
          :error,
          message: "Act creation failed", details: Errors.error_details(changeset)
        }

      {:ok, act} ->
        {:ok, %{act: act}}
    end
  end
end
