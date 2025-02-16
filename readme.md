# Keycloak script authorization policies

This repository contains following scripts:

* owner-policy
* same-group-policy

These two scripts are related to a Youtube video: [Link](#)

## Deploy to kubernetes

Use this command to create a jar file.

```sh
jar cf policies.jar -C . .
```

Then create a configmap from the `jar` file in k8s.

```sh
kubectl create configmap kc-policies --from-file=./policies.jar -n <your-keycloak-namespace>
```

Now inside the bitnami's keycloak helm chart, add the following:

```yml
extraVolumes:
  - name: policies
    configMap:
      name: kc-policies
extraVolumeMounts:
  - name: policies
    mountPath: /opt/bitnami/keycloak/providers/policies.jar
    subPath: policies.jar
```

## Policies description
These two policies will help you in implementing `ABAC` for your authorization requirements.

* **owner-policy**: Makes sure the user can only access any resource he/she owns.
* **same-group-policy**: Makes sure the user can access certain resource only if he/she is in the same group as the resource's owner.