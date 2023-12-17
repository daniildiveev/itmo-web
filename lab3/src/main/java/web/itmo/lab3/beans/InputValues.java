package web.itmo.lab3.beans;

import jakarta.faces.application.FacesMessage;
import jakarta.faces.bean.ApplicationScoped;
import jakarta.faces.bean.ManagedBean;
import jakarta.faces.context.FacesContext;
import web.itmo.lab3.validator.ParameterValidator;
import web.itmo.lab3.validator.ValidParameter;

import java.io.Serializable;

@ManagedBean(name = "inputValues")
@ApplicationScoped
public class InputValues implements Serializable {
    private float x;
    private float y;
    private float R;

    public float getX() {
        return this.x;
    }

    public float getY() {
        return this.y;
    }

    public float getR() {
        return this.R;
    }

    public void setX(float x) {
        this.x = x;
    }

    public void setY(float y) {
        this.y = y;
    }

    public void setR(float r) {
        this.R = r;
    }

    public void validate() {
        ValidParameter validParameter = ParameterValidator.checkRanges(this.x, this.y, this.R);

        if (!validParameter.getValid()) {
            FacesContext.getCurrentInstance().addMessage(null,
                    new FacesMessage(validParameter.getMessage()));
        } else {
            FacesContext.getCurrentInstance().addMessage(null,
                    new FacesMessage("OK"));
        }
    }
}
