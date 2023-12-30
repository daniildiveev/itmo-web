package web.itmo.lab3.beans;

import jakarta.faces.bean.ApplicationScoped;
import jakarta.faces.bean.ManagedBean;

import java.io.Serializable;

@ManagedBean(name = "inputValues")
@ApplicationScoped
public class InputValues implements Serializable {
    private float x;
    private float y;
    private float r;

    public float getX() {
        return this.x;
    }

    public float getY() {
        return this.y;
    }

    public float getR() {
        return this.r;
    }

    public void setX(float x) {
        this.x = x;
    }

    public void setY(float y) {
        this.y = y;
    }

    public void setR(float R) {
        this.r = R;
    }
}
