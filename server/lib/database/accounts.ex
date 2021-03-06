defmodule Database.Accounts do
  use Database.Context

  def get_user(id) do
    Repo.get(User, id)
  end

  def user_create(attrs) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  def session_create(username, password) do
    user = Repo.get_by(User, username: username)

    with %{password_hash: password_hash} <- user,
         true <- Pbkdf2.verify_pass(password, password_hash) do
      {:ok, user}
    else
      _ -> :error
    end
  end
end
