package web.itmo.lab2.models;

import java.io.Serializable;

public class HitDataBean implements Serializable {
    private float x;
    private float y;
    private float R;

    private String hit = null;

    public HitDataBean(){}

    public float getX(){
        return this.x;
    }

    public float getY(){
        return this.y;
    }

    public float getR(){
        return this.R;
    }

    public String getHit(){
        return this.hit;
    }

    public void setX(float x){
        this.x = x;
    }

    public void setY(float y){
        this.y = y;
    }

    public void setR(float R){
        this.R = R;
    }

    public void setHit(String hit){
        this.hit = hit;
    }
}
